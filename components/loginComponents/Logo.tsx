import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

export default function Logo() {
    return (
        <View>
            <Image
                style={styles.LogoApp}
                source={require("@/assets/images/carrot.png")}
                contentFit="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    LogoApp: {
        width: 150,
        height: 150,
        alignSelf: "center",
        marginTop: 40,
        marginBottom: 20,
    },
});