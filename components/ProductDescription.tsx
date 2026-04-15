import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const ProductDescription = ({ productDetails }: any) => {
  return (
    <>
      <Text style={styles.detailTitle}>Product Detail</Text>
      <Text style={styles.description}>
        {`${productDetails.description} `}
      </Text>
    </>
  );
};

export default ProductDescription;

const styles = StyleSheet.create({
  detailTitle: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: "gray",
    marginBottom: 35,
  },
});