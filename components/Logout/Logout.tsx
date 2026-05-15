import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

export default function LogoutButton() {
    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("token");
        router.replace("/LoginScreen");
    };

    return (
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    logoutButton: {
        marginTop: 25,
        backgroundColor: "#E74C3C",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    logoutText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});