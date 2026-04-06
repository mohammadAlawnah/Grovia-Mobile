import { useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Logo from "@/components/loginComponents/Logo";
import Buttons from "@/components/loginComponents/Buttons";


export default function EnterCodeScreen() {

    const { email } = useLocalSearchParams();
    const router = useRouter();

    const [digits, setDigits] = useState(["", "", "", ""]);
    const inputsRef = useRef<TextInput[]>([]);

    const handleChange = (text: string, index: number) => {
        if (/^\d$/.test(text) || text === "") {
            const newDigits = [...digits];
            newDigits[index] = text;
            setDigits(newDigits);

            if (text && index < 3) {
                inputsRef.current[index + 1].focus();
            }
            if (!text && index > 0) {
                inputsRef.current[index - 1].focus();
            }
        }
    };

    const handleVerify = async () => {
        const code = digits.join("");

        if (code.length < 4) {
            Alert.alert("Error", "Please enter all 4 digits");
            return;
        }

        try {
            const response = await verifyOtp({ email, code });

            if (response.data.success) {
                router.push({
                    pathname: "/resetPassword",
                    params: { email }
                });
            } else {
                Alert.alert("Error", "Invalid code, try again");
            }

        } catch (err) {
            console.log(err);
            Alert.alert("Error", "Something went wrong");
        }
    };

    return (
        <View style={styles.container}>
            <Logo/>
            <Text style={styles.title}>
                Enter the 4-digit code sent to your email
            </Text>

            <View style={styles.inputContainer}>
                {digits.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.inputBox}
                        value={digit}
                        keyboardType="numeric"
                        maxLength={1}
                        onChangeText={(text) => handleChange(text, index)}
                        ref={(ref) => {
                            inputsRef.current[index] = ref!;
                        }}
                    />
                ))}
            </View>
            <Buttons title="Verify" onPress={handleVerify} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "white",
    },

    title: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 40,
    },

    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
    },

    inputBox: {
        width: 60,
        height: 60,
        borderWidth: 2.5,
        borderColor: "black",
        // color: "white",
        fontSize: 24,
        textAlign: "center",
        borderRadius: 8,
    },
});