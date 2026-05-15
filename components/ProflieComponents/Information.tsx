import { ScrollView, StyleSheet, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export default function InformationComponents() {
    const [user, setUser] = useState<any>(null);

    const getUser = async () => {
        const userData = await SecureStore.getItemAsync("user");

        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.TextStyle}>
                {user?.email ?? "No email found"}
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 2,
    },
    TextStyle: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
    },
});