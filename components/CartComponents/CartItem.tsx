import {
    decreaseCartItem,
    increaseCartItem,
    removeItem,
} from "@/api/Cart.Servise";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type CartItemType = {
  id: number;
  quantity: number;
  price: string;
  product: {
    id: number;
    title: string;
    quantity: number;
    unit: string;
    img: string;
  };
};

type CartItemProps = {
  item: CartItemType;
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
};

export default function CartItem({ item, setCartItems }: CartItemProps) {
  const deleteItem = async (productId: number) => {
    await removeItem(productId);

    setCartItems((prev) =>
      prev.filter((cartItem) => cartItem.product.id !== productId),
    );
  };

  const increaseItem = async (productId: number) => {
    await increaseCartItem(productId);

    setCartItems((prev) =>
      prev.map((cartItem) =>
        cartItem.product.id === productId
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              price: (
                Number(cartItem.price) +
                Number(cartItem.price) / cartItem.quantity
              ).toString(),
            }
          : cartItem,
      ),
    );
  };

  const decreaseItem = async (productId: number) => {
    await decreaseCartItem(productId);

    setCartItems((prev) =>
      prev
        .map((cartItem) => {
          if (cartItem.product.id !== productId) return cartItem;

          if (cartItem.quantity === 1) return null;

          return {
            ...cartItem,
            quantity: cartItem.quantity - 1,
            price: (
              Number(cartItem.price) -
              Number(cartItem.price) / cartItem.quantity
            ).toString(),
          };
        })
        .filter((cartItem): cartItem is CartItemType => cartItem !== null),
    );
  };

  return (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.product.img }}
        style={styles.productImage}
        resizeMode="contain"
      />

      <View style={styles.itemInfo}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.product.title}</Text>

          <TouchableOpacity onPress={() => deleteItem(item.product.id)}>
            <Ionicons name="close" size={22} color="#B3B3B3" />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>
          {item.product.quantity}
          {item.product.unit}, Price
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.countRow}>
            <TouchableOpacity
              style={styles.countButton}
              onPress={() => decreaseItem(item.product.id)}
            >
              <Ionicons name="remove" size={18} color="#B3B3B3" />
            </TouchableOpacity>

            <Text style={styles.countText}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.countButton}
              onPress={() => increaseItem(item.product.id)}
            >
              <Ionicons name="add" size={18} color="#53B175" />
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>${Number(item.price).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  itemInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#181725",
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#7C7C7C",
    marginTop: 5,
  },
  bottomRow: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  countButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#181725",
    marginHorizontal: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#181725",
  },
});
