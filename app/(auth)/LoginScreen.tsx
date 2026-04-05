import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Controller, useForm } from "react-hook-form";
import { login } from "@/api/UserService";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type FormData = {
    email: string;
    password: string;
};

export default function LoginScreen() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ mode: "all" });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: FormData) => {
        try {
            const result = await login(data);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.LogoApp}
                source={require("@/assets/images/carrot.png")}
                contentFit="contain"
            />

            <Text style={styles.titlePage}>Login page</Text>

            <Text style={styles.textTitle}>Email</Text>
            <Controller
                control={control}
                name="email"
                rules={{
                    required: "Email is required",
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email",
                    },
                }}
                render={({ field }) => (
                    <View>
                        <TextInput
                            style={styles.inputStyle}
                            onBlur={field.onBlur}
                            onChangeText={field.onChange}
                            value={field.value}
                            placeholder="Email"
                            placeholderTextColor="gray"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {errors.email && (
                            <Text style={styles.errorText}>
                                {errors.email.message}
                            </Text>
                        )}
                    </View>
                )}
            />

            <Text style={styles.textTitle}>Password</Text>
            <Controller
                control={control}
                name="password"
                rules={{
                    required: "Password is required",
                }}
                render={({ field }) => (
                    <View>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                onBlur={field.onBlur}
                                onChangeText={field.onChange}
                                value={field.value}
                                placeholder="Password"
                                placeholderTextColor="gray"
                                secureTextEntry={!showPassword}
                            />

                            <Ionicons
                                name={showPassword ? "eye-off" : "eye"}
                                size={22}
                                color="gray"
                                onPress={() => setShowPassword(!showPassword)}
                            />
                        </View>

                        {errors.password && (
                            <Text style={styles.errorText}>
                                {errors.password.message}
                            </Text>
                        )}
                    </View>
                )}
            />

            <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </View>

            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
    },

    titlePage: {
        fontSize: 20,
        marginBottom: 20,
        alignSelf: "center",
    },

    textTitle: {
        paddingVertical: 8,
        fontSize: 15,
    },

    LogoApp: {
        width: 180,
        height: 180,
        alignSelf: "center",
        marginTop: 40,
        marginBottom: 20,
    },

    inputStyle: {
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 5
    },

    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        height: 45,
        paddingHorizontal: 10,
        marginBottom: 5
    },

    passwordInput: {
        flex: 1,
        outlineStyle: "none"
    },

    errorText: {
        color: "red",
        marginBottom: 15,
    },

    forgotPassword: {
        alignSelf: "flex-end",
        fontSize: 15,
        marginBottom: 20
    },

    buttonStyle: {
        backgroundColor: "#53B175",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20
    },

    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600"
    }

});