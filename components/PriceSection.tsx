import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
const PriceSection = ({ productDetails, count, increseCount, decreseCount }: any) => {
  return (
    <View style={styles.priceRow}>
      <View style={styles.counter}>
        <Pressable onPress={decreseCount} disabled={count == 1}>
          <Ionicons name="remove" size={24} color={count == 1 ? "gray" : "red"} />
        </Pressable>

        <View style={styles.countBox}>
          <Text>{count}</Text>
        </View>

        <Pressable onPress={increseCount}>
          <Ionicons name="add" size={24} color="green" />
        </Pressable>
      </View>

      <Text style={styles.price}>{`${(productDetails.price * count).toFixed(2)} $`}</Text>
    </View>
  );
};

export default PriceSection;

const styles = StyleSheet.create({
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  countBox: {
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 10,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 9,
    paddingBottom: 9,
    marginRight: 10,
    marginLeft: 10,
  },
  price: {
    fontSize: width * 0.055,
    fontWeight: "bold",
  },
});