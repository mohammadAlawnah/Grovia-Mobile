import React from "react";
import { View,Text,StyleSheet } from "react-native";
import Logo from "@/components/loginComponents/Logo";
import Email from "@/components/loginComponents/Email";
import { useForm, Controller } from "react-hook-form";
import Buttons from "@/components/loginComponents/Buttons";

type FormData = {
    email: string;
};

export default function ResetPasswordScreen() {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ mode: "all" });

    return (
        <View >
            <Logo/>
            <Text style={styles.titlePage}>Reset your password</Text>
            <Email control={control} errors={errors} name="Email" />
            <Buttons title="send code" onPress={handleSubmit}/>

        </View>
    )
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
});