import { useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    useWindowDimensions
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Logo from "@/components/loginComponents/Logo";
import Buttons from "@/components/loginComponents/Buttons";

export default function EnterCodeScreen() {

    const { email } = useLocalSearchParams();
    const router = useRouter();
    const { width } = useWindowDimensions();

    const normalize = (size: number) => {
        return (size / 375) * width;
    };

    const [digits, setDigits] = useState(["", "", "", ""]);
    const inputsRef = useRef<TextInput[]>([]);

    const handleChange = (text: string, index: number) => {
        if (/^\d$/.test(text) || text === "") {
            const newDigits = [...digits];
            newDigits[index] = text;
            setDigits(newDigits);

            if (text && index < 3) {
                inputsRef.current[index + 1]?.focus();
            }
            if (!text && index > 0) {
                inputsRef.current[index - 1]?.focus();
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
        <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={[styles.container, { paddingHorizontal: width * 0.05 }]}>

                <Logo />

                <Text style={[styles.title, { fontSize: normalize(18) }]}>
                    Enter the 4-digit code sent to your email
                </Text>

                <View style={styles.inputContainer}>
                    {digits.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={[
                                styles.inputBox,
                                {
                                    width: width * 0.14,
                                    height: width * 0.14,
                                    fontSize: normalize(18),
                                    borderRadius: width * 0.02,
                                }
                            ]}
                            value={digit}
                            keyboardType="numeric"
                            maxLength={1}
                            onChangeText={(text) => handleChange(text, index)}
                            ref={(ref) => {
                                if (ref) inputsRef.current[index] = ref;
                            }}
                        />
                    ))}
                </View>

                <View style={{ width: "100%" }}>
                    <Buttons title="Verify" onPress={handleVerify} />
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
        justifyContent: "center",
        backgroundColor: "white",
    },

    title: {
        textAlign: "center",
        marginBottom: 40,
        fontWeight: "500",
    },

    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
    },

    inputBox: {
        borderWidth: 2,
        borderColor: "black",
        textAlign: "center",
    },
});