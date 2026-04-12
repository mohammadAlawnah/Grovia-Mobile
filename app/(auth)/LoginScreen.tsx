import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { login } from "@/api/UserService";
import Logo from "@/components/loginComponents/Logo";
import Email from "@/components/loginComponents/Email";
import Password from "@/components/loginComponents/Password";
import Button from "@/components/loginComponents/Buttons";
import { Link } from "expo-router";

type FormData = {
    email: string;
    password: string;
};

export default function LoginScreen() {
    const { width, height } = useWindowDimensions();
    const normalize = (size: number) => {
        return (size/375) * width;
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ mode: "all" });

    const onSubmit = async (data: FormData) => {
        try {
            console.log("login Data", data);
            const result = await login(data);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

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
                            paddingHorizontal: width * 0.07,
                            minHeight: height,
                        }
                    ]}
                    keyboardShouldPersistTaps="handled"
                >
                    <Logo />

                    <Text style={[styles.title, {fontSize: normalize(20)}]}>Login page</Text>

                    <View style={{ width: "100%" }}>
                        <Email control={control} errors={errors} name="email" />

                        <Password
                            control={control}
                            errors={errors}
                            name="password"
                            placeholder="Password"
                        />
                    </View>

                    <View style={styles.forgotContainer}>
                        <Link href={"/ForgotPasswordScreen"}>
                            <Text style={{ fontSize: normalize(20) }}>
                                Forgot Password?
                            </Text>
                        </Link>
                    </View>

                    <View style={{ width: "100%" }}>
                        <Button title="Login" onPress={handleSubmit(onSubmit)} />
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

    forgotContainer: {
        alignItems: "flex-end",
        marginBottom: 20,
    },
});