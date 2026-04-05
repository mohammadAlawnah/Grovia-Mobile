import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function GroviaSplashScreen() {
  const { width, height } = useWindowDimensions();

  const w = (value: number) => width * value;
  const h = (value: number) => height * value;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/WelcomeScreen");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#59C17A" />

      <View style={styles.content}>
        <View style={styles.logoRow}>
          <Image
            source={require("../assets/images/carrot.png")}
            style={{
              width: w(0.12),
              height: w(0.12),
              marginRight: w(0.02),
            }}
            resizeMode="contain"
          />

          <Text
            style={{
              fontSize: w(0.12),
              fontWeight: "400",
              color: "#FFFFFF",
              letterSpacing: 0.2,
            }}
          >
            Grovia
          </Text>
        </View>

        <Text
          style={{
            marginTop: h(0.005),
            marginLeft: w(0.1),
            fontSize: w(0.04),
            color: "#FFFFFF",
            letterSpacing: 3,
            fontWeight: "400",
            textTransform: "lowercase",
          }}
        >
          online groceriet
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#59C17A",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
