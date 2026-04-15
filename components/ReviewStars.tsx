import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-paper";

const ReviewStars = ({ productDetails }: any) => {
  return (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          source={
            i <= (productDetails.rating || 2) ? "star" : "star-outline"
          }
          color="orange"
          size={20}
        />
      ))}
    </View>
  );
};

export default ReviewStars;

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: "row",
    marginRight: 10,
  },
});