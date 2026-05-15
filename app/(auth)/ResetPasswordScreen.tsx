import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

import { resetPassword } from "@/api/ResetPassword";
import Button from "@/components/loginComponents/Buttons";
import Logo from "@/components/loginComponents/Logo";
import Password from "@/components/loginComponents/Password";

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordScreen() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  const { email } = useLocalSearchParams();
  const userEmail = Array.isArray(email) ? email[0] : email;

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "all" });

  const onSubmit = async (data: FormData) => {
    setServerError(null);

    if (data.password !== data.confirmPassword) {
      setServerError("Passwords do not match");
      return;
    }

    try {
      const result = await resetPassword({
        email: userEmail,
        password: data.password,
        verifyPassword: data.confirmPassword,
      });

      if (result.status === 201) {
        router.replace("/LoginScreen");
      }
    } catch (error: any) {
      console.log(error?.response?.data);
      setServerError(error?.response?.data?.message || "Error");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            {
              paddingHorizontal: width * 0.05,
              minHeight: height,
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <Logo />
          <Text style={styles.title}>Reset Password</Text>
          <View style={{ width: width * 0.8 }}>
            <Password
              control={control}
              errors={errors}
              name="password"
              placeholder="Password"
            />
            <Password
              control={control}
              errors={errors}
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            {serverError && <Text style={styles.errorText}>{serverError}</Text>}
          </View>
          <View style={{ width: width * 0.8 }}>
            <Button title="Reset Password" onPress={handleSubmit(onSubmit)} />
          </View>
        </ScrollView>
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
    fontSize: 20,
  },

  errorText: {
    color: "red",
    marginTop: 5,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
});
