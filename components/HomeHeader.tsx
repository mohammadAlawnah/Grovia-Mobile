import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeHeader() {
  return (
    <>
      <View style={styles.logoWrapper}>
        <Text style={styles.logo}>🥕</Text>
      </View>

      <View style={styles.locationRow}>
        <Ionicons name="location-sharp" size={18} color="#4C4F4D" />
        <Text style={styles.locationText}>Dhaka, Banassre</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    alignItems: "center",
    marginTop: 6,
  },
  logo: {
    fontSize: 28,
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 18,
  },
  locationText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "600",
    color: "#4C4F4D",
  },
});
