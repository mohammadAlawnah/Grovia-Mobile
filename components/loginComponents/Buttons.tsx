import { StyleSheet, TouchableOpacity, Text, useWindowDimensions } from "react-native";

type Props = {
    title: string;
    onPress: () => void;
};

export default function Buttons({ title, onPress }: Props) {

    const { width } = useWindowDimensions();

    return (
        <TouchableOpacity
            style={[
                styles.buttonStyle,
                {
                    paddingVertical: width * 0.04,
                    borderRadius: width * 0.03,
                }
            ]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, { fontSize: width * 0.04 }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#53B175",
        alignItems: "center",
        marginTop: 20,
        width: "100%",
    },

    buttonText: {
        color: "white",
        fontWeight: "600",
    },
});