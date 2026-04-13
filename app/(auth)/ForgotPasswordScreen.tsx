import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

import { sendResetCode } from "@/api/ResetPassword";
import Buttons from "@/components/loginComponents/Buttons";
import Email from "@/components/loginComponents/Email";
import Logo from "@/components/loginComponents/Logo";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
};

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { width, height } = useWindowDimensions();

  const normalize = (size: number) => (size / 375) * width;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "all" });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);
      await sendResetCode(data);
      router.push({
        pathname: "/EnterCodeScreen",
        params: {
          email: data.email,
        },
      });
    } catch (err) {
      setError("Email not found");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <View style={{ marginTop: 20 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
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
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Logo />
        <Text style={[styles.title, { fontSize: normalize(20) }]}>
          Reset your password
        </Text>
        <View style={{ width: width * 0.8 }}>
          <Email control={control} errors={errors} name="email" />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <Buttons title="Send Code" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: "white",
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginBottom: 20,
    alignSelf: "center",
    fontWeight: "600",
  },

  errorText: {
    color: "red",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
});
