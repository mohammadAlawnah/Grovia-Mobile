import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  {
    id: "1",
    title: "Frash Fruits\n& Vegetable",
    image:
      "https://dalpl.co.in/wp-content/uploads/2024/05/bigstock-Wicker-Basket-With-Assorted-Or-56073449.jpg",
    bgColor: "#EAF4EE",
    borderColor: "#9ED9B0",
  },
  {
    id: "2",
    title: "Cooking Oil\n& Ghee",
    image:
      "https://dalpl.co.in/wp-content/uploads/2024/05/bigstock-Wicker-Basket-With-Assorted-Or-56073449.jpg",
    bgColor: "#FDF3E8",
    borderColor: "#EBC59A",
  },
  {
    id: "3",
    title: "Meat & Fish",
    image:
      "https://dalpl.co.in/wp-content/uploads/2024/05/bigstock-Wicker-Basket-With-Assorted-Or-56073449.jpg",

    bgColor: "#FCE9E7",
    borderColor: "#E8A5A0",
  },
  {
    id: "4",
    title: "Bakery & Snacks",
    image:
      "https://dalpl.co.in/wp-content/uploads/2024/05/bigstock-Wicker-Basket-With-Assorted-Or-56073449.jpg",

    bgColor: "#F4EBF7",
    borderColor: "#D5B3E6",
  },
  {
    id: "5",
    title: "Dairy & Eggs",
    image:
      "https://dalpl.co.in/wp-content/uploads/2024/05/bigstock-Wicker-Basket-With-Assorted-Or-56073449.jpg",

    bgColor: "#FBF6E3",
    borderColor: "#E7D28B",
  },
  {
    id: "6",
    title: "Beverages",
    image:
      "https://dalpl.co.in/wp-content/uploads/2024/05/bigstock-Wicker-Basket-With-Assorted-Or-56073449.jpg",

    bgColor: "#E8F2F8",
    borderColor: "#A8CBE1",
  },
  {
    id: "7",
    title: "Beverages",
    image:
      "https://dalpl.co.in/wp-content/uploads/2024/05/bigstock-Wicker-Basket-With-Assorted-Or-56073449.jpg",

    bgColor: "#E8F2F8",
    borderColor: "#A8CBE1",
  },
  {
    id: "8",
    title: "Beverages",
    image:
      "https://dalpl.co.in/wp-content/uploads/2024/05/bigstock-Wicker-Basket-With-Assorted-Or-56073449.jpg",

    bgColor: "#E8F2F8",
    borderColor: "#A8CBE1",
  },
];

type CategoryItem = {
  id: string;
  title: string;
  image: any;
  bgColor: string;
  borderColor: string;
};

export default function CategoryScreen() {
  const renderItem = ({ item }: { item: CategoryItem }) => {
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: item.bgColor,
            borderColor: item.borderColor,
          },
        ]}
      >
        <Image
          source={item.image}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Text style={styles.headerTitle}>Find Products</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#7C7C7C" />
        <TextInput
          placeholder="Search Store"
          placeholderTextColor="#7C7C7C"
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#181725",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  searchContainer: {
    height: 52,
    backgroundColor: "#F2F3F2",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#181725",
  },
  listContent: {
    paddingBottom: 30,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    width: "48%",
    minHeight: 190,
    borderWidth: 1,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 18,
  },
  cardImage: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#181725",
    textAlign: "center",
    lineHeight: 22,
  },
});
