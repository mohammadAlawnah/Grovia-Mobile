import { StyleSheet, Text, TextInput, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import Logo from "@/components/loginComponents/Logo";
import Password from "@/components/loginComponents/Password";
import Button from "@/components/loginComponents/Buttons";

type FormData = {
    password: string;
    confirmPassword: string;
};

export default function ResetPasswordScreen() {
    const router = useRouter();
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
        <SafeAreaView style={styles.container}>
            <Logo/>
            <Text style={styles.titlePage}>Reset Password</Text>
            <Password control={control} errors={errors} name="new password" placeholder="new password" />
            <Password control={control} errors={errors} name="confirm password" placeholder="confirm Password" />
            <Button title="Reset Password" onPress={handleSubmit}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    titlePage: {
        fontSize: 20,
        marginBottom: 20,
        alignSelf: "center",
    },
});