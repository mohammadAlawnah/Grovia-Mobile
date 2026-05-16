import { getProductById } from "@/api/Product.Servise";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ProductImageCard from "@/components/productDetailsComp/ProductImageCard";
import ProductHeader from "@/components/productDetailsComp/ProductHeader";
import PriceSection from "@/components/productDetailsComp/PriceSection";
import ProductDescription from "@/components/productDetailsComp/ProductDescription";
import NutritionInfo from "@/components/productDetailsComp/NutritionInfo";
import ReviewStars from "@/components/productDetailsComp/ReviewStars";
import AddToCartButton from "@/components/productDetailsComp/AddToCartButton";
import { Dimensions } from "react-native";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

const { width } = Dimensions.get("window");
const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState<any>({});
  const { id } = useLocalSearchParams();
  const [count, setCount] = useState(1);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorite = isFavorite(productDetails?.id);

  const increseCount = () => {
    setCount(count + 1);
  };

  const decreseCount = () => {
    setCount(count - 1);
  };

  const fetechData = async () => {
    const response = await getProductById(id);
    setProductDetails(response.data);
  };

  const toggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(productDetails.id);
    } else {
      addToFavorites(productDetails);
    }
  };

  useEffect(() => {
    fetechData();
  }, []);

  return (
    <View style={styles.container}>

      <ProductImageCard productDetails={productDetails} />

      <View style={styles.content}>

        <ProductHeader
          productDetails={productDetails}
          isFavorite={favorite}
          setIsFavorite={toggleFavorite}
        />


        <Text style={styles.weight}>
          {`${productDetails.quantity},${productDetails.unit}`}
        </Text>


        <PriceSection
          productDetails={productDetails}
          count={count}
          increseCount={increseCount}
          decreseCount={decreseCount}
        />

        <View style={styles.divider} />


        <ProductDescription productDetails={productDetails} />

        <View style={styles.divider} />


        <NutritionInfo productDetails={productDetails} />

        <View style={styles.divider} />


        <View style={styles.listRow}>
          <Text style={styles.rowTitle}>Review</Text>
          <ReviewStars productDetails={productDetails} />
        </View>
        
        <AddToCartButton onPress={() => addToCart(count)} />
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    padding: width * 0.05,
    flex: 1,
  },

  weight: {
    color: "gray",
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "lightgray",
    marginTop: 15,
    marginBottom: 15,
  },

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
});
