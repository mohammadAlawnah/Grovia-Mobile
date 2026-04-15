import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Banner() {
  return (
    <>
      <View style={styles.banner}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1200&auto=format&fit=crop",
          }}
          style={styles.bannerLeftImage}
          resizeMode="contain"
        />

        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Fresh Vegetables</Text>
          <Text style={styles.bannerSubtitle}>Get Up To 40% OFF</Text>
        </View>

        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
          }}
          style={styles.bannerRightImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.dotsContainer}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 115,
    backgroundColor: "#F3F8E8",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    paddingHorizontal: 10,
  },
  bannerLeftImage: {
    width: 90,
    height: 90,
  },
  bannerRightImage: {
    width: 70,
    height: 70,
  },
  bannerTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#181725",
  },
  bannerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#53B175",
    fontWeight: "500",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 3,
  },
  activeDot: {
    width: 18,
    backgroundColor: "#53B175",
  },
});
