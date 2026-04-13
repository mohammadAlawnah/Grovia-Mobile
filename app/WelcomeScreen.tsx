import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

export default function WelcomeScreen() {
  const { width, height } = useWindowDimensions();

  const w = (value: number) => width * value;
  const h = (value: number) => height * value;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ImageBackground
        source={require("../assets/images/welcome-image.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Image
              source={require("../assets/images/carrot.png")}
              style={{
                width: w(0.12),
                height: w(0.12),
                marginBottom: h(0.015),
                tintColor: "#fff",
              }}
              resizeMode="contain"
            />

            <Text
              style={[
                styles.title,
                {
                  fontSize: w(0.115),
                  lineHeight: w(0.135),
                  marginBottom: h(0.015),
                },
              ]}
            >
              Welcome{"\n"}to our store
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  fontSize: w(0.04),
                  lineHeight: w(0.06),
                  marginBottom: h(0.045),
                  paddingHorizontal: w(0.06),
                },
              ]}
            >
              Get your groceries in as fast as one hour
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/(auth)/LoginScreen")}
              style={[
                styles.button,
                {
                  width: w(0.82),
                  height: h(0.07),
                  borderRadius: w(0.04),
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    fontSize: w(0.043),
                  },
                ]}
              >
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  content: {
    alignItems: "center",
    paddingBottom: "12%",
    paddingHorizontal: "7%",
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
  },
  subtitle: {
    color: "#F2F3F2",
    textAlign: "center",
    fontWeight: "400",
  },
  button: {
    backgroundColor: "#53B175",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
