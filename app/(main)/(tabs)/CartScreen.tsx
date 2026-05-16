import { getCart } from "@/api/Cart.Servise";
import CartItem, { CartItemType } from "@/components/CartComponents/CartItem";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const getCartData = async () => {
    try {
      setLoading(true);

      const response = await getCart();

      setCartItems(response.data.items);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getCartData();
    }
  }, [isFocused]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#53B175" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Cart</Text>

      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem item={item} setCartItems={setCartItems} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Go to Checkout</Text>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>${totalPrice.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#181725",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  checkoutButton: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    height: 65,
    borderRadius: 18,
    backgroundColor: "#53B175",
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  totalContainer: {
    position: "absolute",
    right: 15,
    backgroundColor: "#489E67",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  totalText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
