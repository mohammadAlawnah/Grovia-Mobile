import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
const { width, height } = Dimensions.get("window");
const ProductImageCard = ({ productDetails }: any) => {
  return (
    <View style={styles.topCard}>
      <Image source={{ uri: productDetails.img }} style={styles.image} />
    </View>
  );
};

export default ProductImageCard;

const styles = StyleSheet.create({
  topCard: {
    backgroundColor: "#f2f3f2",
    height: height * 0.35,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
 image: {
  width: width * 0.65,
  height: width * 0.5,
},
});