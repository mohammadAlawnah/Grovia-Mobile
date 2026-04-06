import { StyleSheet, View, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";

type Props = {
    control: any;
    errors: any;
    name: string;
};

export default function Email({ control, errors, name }: Props) {
    return (
        <View>
            <Text style={styles.textTitle}>{name}</Text>
            <Controller
                control={control}
                name={name}
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
                            <Text style={styles.errorText}>{errors.email.message}</Text>
                        )}
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputStyle: {
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 5,
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