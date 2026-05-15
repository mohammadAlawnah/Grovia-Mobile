import {ScrollView, StyleSheet, Text} from "react-native";
import * as SecureStore from "expo-secure-store";
import {useEffect, useState} from "react";

export default function InformationComponents() {
    const [user, setUser] = useState<any>(null);
    const getUser =async () => {
        const userData = await SecureStore.getItemAsync("user");
        if (userData) {
            setUser(userData);
        }
    }
    useEffect(() => {
        getUser();
    },[]);

    return (
        <ScrollView>
            <Text style={styles.TextStyle}>{"Test1"}</Text>
            <Text>{"Test2"}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {},
    TextStyle:{
        textAlign: "center"
    }
})