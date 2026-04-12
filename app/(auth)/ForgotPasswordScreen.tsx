import React from "react";
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    useWindowDimensions
} from "react-native";
import Logo from "@/components/loginComponents/Logo";
import Email from "@/components/loginComponents/Email";
import { useForm } from "react-hook-form";
import Buttons from "@/components/loginComponents/Buttons";

type FormData = {
    email: string;
};

export default function ResetPasswordScreen() {

    const { width } = useWindowDimensions();

    const normalize = (size: number) => {
        return (size / 375) * width;
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ mode: "all" });

    const onSubmit = (data: FormData) => {
        console.log(data.email);
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior="padding"
        >
            <View style={[styles.container, { paddingHorizontal: width * 0.05 }]}>

                <Logo />

                <Text style={[styles.titlePage, { fontSize: normalize(20) }]}>
                    Reset your password
                </Text>

                <View style={styles.formContainer}>

                    <Email
                        control={control}
                        errors={errors}
                        name="Email"
                    />

                    <Buttons
                        title="send code"
                        onPress={handleSubmit(onSubmit)}
                    />

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
        backgroundColor: "white",
        justifyContent: "center",
    },

    formContainer: {
        width: "100%",
    },

    titlePage: {
        marginBottom: 20,
        alignSelf: "center",
        fontWeight: "600",
    },
});