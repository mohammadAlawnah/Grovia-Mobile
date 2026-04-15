import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { IconButton } from "react-native-paper";
const { width } = Dimensions.get("window");
const ProductHeader = ({ productDetails, isFavorite, setIsFavorite }: any) => {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.title}>{productDetails.title}</Text>

      <Pressable onPress={() => setIsFavorite(!isFavorite)}>
        <IconButton
          icon={isFavorite ? "heart" : "heart-outline"}
          iconColor={isFavorite ? "red" : "gray"}
          size={28}
          onPress={() => setIsFavorite(!isFavorite)}
        />
      </Pressable>
    </View>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: width * 0.065,
    fontWeight: "bold",
  },
});