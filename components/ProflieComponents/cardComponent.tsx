import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
};

export default function CardComponent({ icon, title }: Props) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
            <Ionicons name={icon} size={22} />
            <Text style={{ marginLeft: 10 }}>{title}</Text>
        </View>
    );
}