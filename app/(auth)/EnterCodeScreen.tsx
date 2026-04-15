import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  ActivityIndicator,
} from "react-native";

import { verifyOtp } from "@/api/ResetPassword";
import Buttons from "@/components/loginComponents/Buttons";
import Logo from "@/components/loginComponents/Logo";
import { useLocalSearchParams, useRouter } from "expo-router";

type VerifyOtpData = {
  email: string;
  code: string;
};

export default function EnterCodeScreen() {
  const { email } = useLocalSearchParams();
  const userEmail = Array.isArray(email) ? email[0] : email;

  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const normalize = (size: number) => (size / 375) * width;

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setError(null);

    if (!userEmail) {
      setError("Email not found");
      return;
    }

    if (code.trim().length !== 4) {
      setError("Please enter 4-digit code");
      return;
    }

    const data: VerifyOtpData = {
      email: userEmail,
      code: code.trim(),
    };

    try {
      setLoading(true);

      await verifyOtp(data);

      router.push({
        pathname: "/ResetPasswordScreen",
        params: { email: userEmail },
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  // Loading Screen
  if (loading) {
    return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#53B175" />
          <Text style={styles.loadingText}>Verifying...</Text>
        </View>
    );
  }

  return (
      <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
            style={[
              styles.container,
              {
                paddingHorizontal: width * 0.05,
                paddingTop: height * 0.08, // نزول الشاشة
              },
            ]}
        >
          <Logo />

          <Text style={[styles.title, { fontSize: normalize(18) }]}>
            Enter verification code
          </Text>

          {userEmail && (
              <Text style={styles.emailText}>
                Code sent to: {userEmail}
              </Text>
          )}

          <TextInput
              style={[
                styles.input,
                error ? styles.inputError : null,
              ]}
              value={code}
              onChangeText={(text) => {
                setCode(text);
                setError(null);
              }}
              keyboardType="numeric"
              maxLength={4}
              placeholder="Enter code"
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={{ width: "100%" }}>
            <Buttons
                title="Verify"
                onPress={handleVerify}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: "white",
  },

  container: {
    flex: 1,
    justifyContent: "flex-start",
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
  },

  emailText: {
    textAlign: "center",
    marginBottom: 30,
    color: "gray",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },

  inputError: {
    borderColor: "red",
  },

  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
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