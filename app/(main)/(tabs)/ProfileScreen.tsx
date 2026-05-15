import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import LogoutButton from "@/components/Logout/Logout";
import { SafeAreaView } from "react-native-safe-area-context";
import CardComponent from "@/components/ProflieComponents/cardComponent";

export default function ProfileScreen() {
    const { width, height } = useWindowDimensions();
    const normalize = (size: number) => (size / 375) * width;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: width * 0.05,
                    paddingTop: height * 0.05,
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: normalize(20), fontWeight: "600", marginBottom: 20 }}>
                        Profile Screen
                    </Text>
                    <CardComponent icon="reorder-four" title="Order" />
                    <CardComponent icon="id-card" title="My Details" />
                    <CardComponent icon="location" title="Delivery Address" />
                    <CardComponent icon="notifications" title="Notifications" />
                    <CardComponent icon="help" title="Help" />
                    <CardComponent icon="apps-outline" title="About" />
                </View>
                <View
                    style={{
                        marginTop: 30,
                        paddingBottom: 20,
                    }}
                >
                    <LogoutButton />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}