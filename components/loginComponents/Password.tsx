import { StyleSheet, View, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

type Props = {
    control: any;
    errors: any;
    name: string;
    placeholder?: string;
};

export default function Password({ control, errors, name, placeholder }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View>
            <Text style={styles.textTitle}>{name}</Text>
            <Controller
                control={control}
                name={name}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                    <View>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                onBlur={field.onBlur}
                                onChangeText={field.onChange}
                                value={field.value}
                                placeholder={placeholder || "Password"}
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
                        {errors[name] && (
                            <Text style={styles.errorText}>{errors[name].message}</Text>
                        )}
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        height: 45,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    passwordInput: {
        flex: 1,
        outlineStyle: "none",
    },
    errorText: {
        color: "red",
        marginBottom: 15,
    },
    textTitle: {
        paddingVertical: 8,
        fontSize: 15,
    }
});