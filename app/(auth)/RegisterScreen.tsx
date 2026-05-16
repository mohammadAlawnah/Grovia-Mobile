import { regester } from "@/api/UserService";
import Button from "@/components/loginComponents/Buttons";
import Email from "@/components/loginComponents/Email";
import Logo from "@/components/loginComponents/Logo";
import Password from "@/components/loginComponents/Password";
import LocationField from "@/components/registerComponents/Location";
import Username from "@/components/registerComponents/Username";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
  // username: string;
  email: string;
  password: string;
  // location: string;
};

export default function RegisterScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await regester(data);
      router.replace("/LoginScreen");
    } catch (err) {
      setError("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Logo />

          <View style={styles.header}>
            <Text style={styles.title}>Sign Up</Text>
          </View>

          <View style={{ width: width * 0.8 }}>
            <Username control={control} errors={errors} name="username" />
            <LocationField />
            <Email control={control} errors={errors} name="email" />
            <Password
              control={control}
              errors={errors}
              name="password"
              placeholder="Password"
            />
            {error && <Text style={styles.apiError}>{error}</Text>}
          </View>

          <View style={{ width: width * 0.8 }}>
            <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href={"/LoginScreen"}>
              <Text style={styles.loginText}>Login</Text>
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
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 30,
  },
  header: {
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    color: "#181725",
  },

  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  footerText: {
    color: "#181725",
    fontSize: 14,
  },
  loginText: {
    color: "#53B175",
    fontWeight: "600",
    fontSize: 14,
  },
  apiError: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
