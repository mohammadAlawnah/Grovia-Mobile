import { StyleSheet, TouchableOpacity, Text } from "react-native";

type Props = {
    title: string;
    onPress: () => void;
};

export default function Buttons({title, onPress,}: Props) {
    return (
        <TouchableOpacity
            style={styles.buttonStyle}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#53B175",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
    },

    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});