import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { login } from "@/api/UserService";
import Logo from "@/components/loginComponents/Logo";
import Email from "@/components/loginComponents/Email";
import Password from "@/components/loginComponents/Password";
import Button from "@/components/loginComponents/Buttons";
import {Link} from "expo-router";

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
            <Logo />
            <Text style={styles.titlePage}>Login page</Text>

            <Email control={control} errors={errors} name="email" />
            <Password control={control} errors={errors} name="password" placeholder="Password" />

            <View style={{ alignItems: "flex-end" }}>
                <Link href={"/ForgotPasswordScreen"}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </Link>
            </View>
            <Button title="Login" onPress={handleSubmit(onSubmit)} />
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

    forgotPassword: {
        alignSelf: "flex-end",
        fontSize: 15,
        marginBottom: 20,
    },
});