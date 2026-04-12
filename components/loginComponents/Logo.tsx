import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Image } from "expo-image";

export default function Logo() {

    const { width } = useWindowDimensions();

    const normalize = (size: number) => {
        return (size / 375) * width;
    };

    return (
        <View>
            <Image
                style={[
                    styles.LogoApp,
                    {
                        width: normalize(120),
                        height: normalize(120),
                        marginTop: normalize(40),
                        marginBottom: normalize(20),
                    }
                ]}
                source={require("@/assets/images/carrot.png")}
                contentFit="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    LogoApp: {
        alignSelf: "center",
    },
});