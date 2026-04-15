import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const NutritionInfo = ({ productDetails }: any) => {
  return (
    <View style={styles.listRow}>
      <Text style={styles.rowTitle}>Nutritions</Text>

      <View style={styles.tagBox}>
        <Text style={styles.tagText}>
          {`${productDetails.quantity},${productDetails.unit}`}
        </Text>
      </View>
    </View>
  );
};

export default NutritionInfo;

const styles = StyleSheet.create({
  listRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  rowTitle: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tagBox: {
    backgroundColor: "#EBEBEB",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 10,
  },
  tagText: {
    fontSize: width * 0.03,
    color: "#7C7C7C",
    fontWeight: "bold",
  },
});