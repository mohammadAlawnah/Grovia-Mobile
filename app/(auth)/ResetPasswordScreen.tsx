import { StyleSheet, Text, View, Alert, KeyboardAvoidingView, Platform, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import Logo from "@/components/loginComponents/Logo";
import Password from "@/components/loginComponents/Password";
import Button from "@/components/loginComponents/Buttons";
// import { resetPassword } from "@/api/UserService";

type FormData = {
    password: string;
    confirmPassword: string;
};

export default function ResetPasswordScreen() {

    const { width } = useWindowDimensions();
    const router = useRouter();

    const normalize = (size: number) => {
        return (size / 375) * width;
    };

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        mode: "all",
    });

    const onSubmit = async (data: FormData) => {
        if (data.password !== data.confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            const result = await resetPassword({ password: data.password });

            if (result.status === 200) {
                Alert.alert(
                    "Success",
                    "Password has been reset successfully",
                    [{ text: "OK", onPress: () => router.push("/(tabs)/login") }]
                );
            } else {
                Alert.alert("Error", "Failed to reset password");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Something went wrong. Try again later.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <SafeAreaView style={[styles.container, { paddingHorizontal: width * 0.05 }]}>

                <Logo />

                <Text style={[styles.titlePage, { fontSize: normalize(18) }]}>
                    Reset Password
                </Text>

                <View style={{ width: "100%" }}>

                    <Password
                        control={control}
                        errors={errors}
                        name="password"
                        placeholder="new password"
                    />

                    <Password
                        control={control}
                        errors={errors}
                        name="confirmPassword"
                        placeholder="confirm password"
                    />

                </View>

                <View style={{ width: "100%" }}>
                    <Button
                        title="Reset Password"
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
    },

    container: {
        flex: 1,
        backgroundColor: "white",
    },

    titlePage: {
        marginBottom: 20,
        alignSelf: "center",
        fontWeight: "600",
    },
});