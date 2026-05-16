import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Banner() {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={require("@/assets/images/Ad-logo.png")}
          style={styles.leftImage}
          resizeMode="contain"
        />

        <View style={styles.textView}>
          <Text style={styles.title}>Fresh Vegetables</Text>
          <Text style={styles.subtitle}>Get Up To 40% OFF</Text>
        </View>

        <Image
          source={require("@/assets/images/Ad-logo2.png")}
          style={styles.rightTopImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  banner: {
    height: 120,
    backgroundColor: "#FAF8EC",
    borderRadius: 18,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
  },
  leftImage: {
    position: "absolute",
    left: -18,
    bottom: 0,
    width: 145,
    height: 120,
  },
  textView: {
    marginLeft: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#000",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#53B175",
    marginTop: 7,
  },
  rightTopImage: {
    position: "absolute",
    right: -35,
    top: -10,
    width: 170,
    height: 100,
    zIndex: -1,
  },
  dotsContainer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#AFAFAF",
    marginHorizontal: 5,
  },
  activeDot: {
    width: 28,
    backgroundColor: "#53B175",
  },
});
