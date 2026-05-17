import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { login } from "@/api/UserService";
import Button from "@/components/loginComponents/Buttons";
import Email from "@/components/loginComponents/Email";
import Logo from "@/components/loginComponents/Logo";
import Password from "@/components/loginComponents/Password";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { width, height } = useWindowDimensions();

  const normalize = (size: number) => {
    return (size / 375) * width;
  };

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await SecureStore.getItemAsync("token");

    if (token != null) {
      router.replace("/HomeScreen");
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "all" });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      setIsLoading(true);
      const result = await login(data);

      const token = result.data.accessToken;
      await SecureStore.setItemAsync("token", token);

      router.replace("/HomeScreen");
    } catch (error: any) {
      setError("Invalid Email or password");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#53B175" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            {
              paddingHorizontal: width * 0.05,
              minHeight: height,
              paddingTop: height * 0.02,
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <Logo />

          <Text style={[styles.title, { fontSize: normalize(20) }]}>
            Login page
          </Text>

          <View style={{ width: width * 0.8 }}>
            <Email control={control} errors={errors} name="email" />

            <Password
              control={control}
              errors={errors}
              name="password"
              placeholder="Password"
            />

            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>

          <View style={{ width: width * 0.8 }}>
            <Button title="Login" onPress={handleSubmit(onSubmit)} />
          </View>

          <View style={styles.forgotContainer}>
            <Link href={"/ForgotPasswordScreen"}>
              <Text style={{ fontSize: normalize(16) }}>Forgot Password?</Text>
            </Link>
          </View>

          <View style={styles.signupContainer}>
            <Text style={{ fontSize: normalize(14) }}>
              Dont have an account?
            </Text>

            <Link href={"/RegisterScreen"}>
              <Text style={[styles.signupText, { fontSize: normalize(14) }]}>
                Sign up
              </Text>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  keyboard: {
    flex: 1,
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  title: {
    marginBottom: 20,
    alignSelf: "center",
  },

  errorText: {
    color: "red",
    marginTop: 5,
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  forgotContainer: {
    alignItems: "center",
    margin: 20,
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginBottom: 20,
  },

  signupText: {
    color: "#53B175",
    fontWeight: "600",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
});
