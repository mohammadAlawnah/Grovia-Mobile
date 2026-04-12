import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    useWindowDimensions
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { login } from "@/api/UserService";
import Logo from "@/components/loginComponents/Logo";
import Email from "@/components/loginComponents/Email";
import Password from "@/components/loginComponents/Password";
import Button from "@/components/loginComponents/Buttons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";

type FormData = {
    email: string;
    password: string;
};

export default function LoginScreen() {
    const { width, height } = useWindowDimensions();

    const normalize = (size: number) => {
        return (size / 375) * width;
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
            setIsLoading(true);
            setError(null);
            const result = await login(data);
            const token = result.data.accessToken;
            await SecureStore.setItemAsync("token", token);
            router.replace("/HomeScreen");
        } catch (error: any) {
            console.log("ERROR:", error?.response?.data);
            setError("Invalid Email or password");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading)
        return (
            <View style={{ marginTop: 20 }}>
                <Text>Loading...</Text>
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
                        },
                    ]}
                    keyboardShouldPersistTaps="handled"
                >
                    <Logo />

                    <Text style={[styles.title, { fontSize: normalize(20) }]}>
                        Login page
                    </Text>

                    <View style={{ width: width * 0.8 }}>
                        <Email
                            control={control}
                            errors={errors}
                            name="email"
                        />

                        <Password
                            control={control}
                            errors={errors}
                            name="password"
                            placeholder="Password"
                        />

                        {error && (
                            <Text style={styles.errorText}>
                                {error}
                            </Text>
                        )}
                    </View>

                    <View style={styles.forgotContainer}>
                        <Link href={"/ForgotPasswordScreen"}>
                            <Text style={{ fontSize: normalize(16) }}>
                                Forgot Password?
                            </Text>
                        </Link>
                    </View>

                    <View style={styles.signupContainer}>
                        <Text style={{ fontSize: normalize(14) }}>
                            Don't have an account?
                        </Text>

                        <Link href={"/RegisterScreen"}>
                            <Text style={[styles.signupText, { fontSize: normalize(14) }]}>
                                Sign up
                            </Text>
                        </Link>
                    </View>

                    <View style={{ width: width * 0.8 }}>
                        <Button
                            title="Login"
                            onPress={handleSubmit(onSubmit)}
                        />
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
        justifyContent: "center",
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
        marginBottom: 10,
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
});