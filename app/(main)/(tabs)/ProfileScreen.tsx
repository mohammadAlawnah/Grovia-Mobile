import {View, Text, ScrollView} from "react-native";
import LogoutButton from "@/components/Logout/Logout";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ProfileScreen() {


    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView contentContainerStyle={{padding:20}}>
                <LogoutButton/>
            </ScrollView>
        </SafeAreaView>
    )
}


