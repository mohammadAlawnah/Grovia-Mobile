import React, {JSX} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, ImageSourcePropType} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    image: ImageSourcePropType;
    title: string;
    price: number;
    onPress: () => void;
}

export default function ProductCard({ image, title, price, onPress,}: Props) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <Image source={image} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
            </View>

            <View style={styles.right}>
                <Text style={styles.price}>{price}</Text>
                <Ionicons name="chevron-forward" size={18} color="#999" />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    image: {
        width: 60,
        height: 60,
        resizeMode: "contain",
        marginRight: 12,
    },

    info: {
        flex: 1,
        justifyContent: "center",
    },

    title: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111",
    },

    subtitle: {
        fontSize: 12,
        color: "#888",
        marginTop: 3,
    },

    right: {
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 4,
    },

    price: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111",
    },
});