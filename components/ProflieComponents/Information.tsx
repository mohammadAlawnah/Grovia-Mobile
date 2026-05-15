import { ScrollView, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/api/UserService";

export default function InformationComponents() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async () => {
        try {
            const res = await getCurrentUser();
            console.log("USER RESPONSE:", res.data);
            setUser(res.data);
        } catch (err: any) {
            console.log("ERROR:", err.response?.status);
            console.log("ERROR DATA:", err.response?.data);
            setError("Failed to load user");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <ActivityIndicator size="large" color="#53B175" />
            </ScrollView>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.TextStyle}>
                {user?.email ?? "No email found"}
            </Text>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    TextStyle: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
    },
    errorText: {
        marginTop: 10,
        color: "red",
    },
});