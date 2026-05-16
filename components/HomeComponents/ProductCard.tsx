import { addItemToCart } from "@/api/Cart.Servise";
import { useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type ProductItem = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  img: string;
};

type ProductCardProps = {
  item: ProductItem;
};

export default function ProductCard({ item }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleGoToProduct = () => {
    router.push(`/product/${item.id}`);
  };

  const handleAddToCart = (event: GestureResponderEvent) => {
    event.stopPropagation();
    addItemToCart(item.id);
    addToCart();
  };

  return (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.85}
      onPress={handleGoToProduct}
    >
      <Image
        source={{ uri: item.img }}
        style={styles.productImage}
        resizeMode="contain"
      />

      <Text style={styles.productTitle} numberOfLines={2}>
        {item.title}
      </Text>

      <Text style={styles.productSubtitle}>{item.subtitle}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.priceText}>{item.price} $</Text>

        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productCard: {
    width: 173,
    minHeight: 248,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginRight: 14,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 100,
    marginBottom: 18,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#181725",
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 14,
    color: "#7C7C7C",
    marginBottom: 18,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#181725",
  },
  addButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#53B175",
    justifyContent: "center",
    alignItems: "center",
  },
});
