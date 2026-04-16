import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

type AddToCartButtonProps = {
  onPress: () => void;
};

const AddToCartButton = ({ onPress }: AddToCartButtonProps) => {
  return (
    <TouchableOpacity style={styles.mainButton} onPress={onPress}>
      <Text style={styles.buttonText}>Add To Basket</Text>
    </TouchableOpacity>
  );
};

export default AddToCartButton;

const styles = StyleSheet.create({
  mainButton: {
    backgroundColor: "green",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
});
