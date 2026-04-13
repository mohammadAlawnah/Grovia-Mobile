import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    useWindowDimensions
} from "react-native";

import { useRouter, useLocalSearchParams } from "expo-router";
import Logo from "@/components/loginComponents/Logo";
import Buttons from "@/components/loginComponents/Buttons";
import { verifyOtp } from "@/api/ResetPassword";

export default function EnterCodeScreen() {

    const { email } = useLocalSearchParams();
    const userEmail = Array.isArray(email) ? email[0] : email;

    const router = useRouter();
    const { width } = useWindowDimensions();

    const normalize = (size: number) => (size / 375) * width;

    const [code, setCode] = useState("");
    const [error, setError] = useState<string | null>(null);

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
        const data: FormData = {
            email: userEmail,
            code: code.trim()
        };
        try {
            console.log("VERIFY DATA:", data);
            const response = await verifyOtp(data);
            router.push({
                pathname: "/ResetPasswordScreen",
                params: { email: userEmail }
            });
        } catch (err: any) {
            console.log("VERIFY ERROR:", err?.response?.data);
            setError(err?.response?.data?.message || "Invalid code");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={[styles.container, { paddingHorizontal: width * 0.05 }]}>
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
                    style={styles.input}
                    value={code}
                    onChangeText={setCode}
                    keyboardType="numeric"
                    maxLength={4}
                    placeholder="Enter 4-digit code"
                />
                {error && (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                )}
                <View style={{ width: "100%" }}>
                    <Buttons title="Verify" onPress={handleVerify} />
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
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
        borderColor: "black",
        padding: 15,
        borderRadius: 10,
        fontSize: 18,
        marginBottom: 10,
        textAlign: "center"
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
    },
});