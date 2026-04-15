import { getCategory } from "@/api/Category.Servise";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  img: string;
  createdAt: string;
  updatedAt: string;
};
type CategoryItem = {
  id: number;
  name: string;
  img: string;
  products: Product[];
};
export default function CategoryScreen() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const colors = [
    { bgColor: "#EAF4EE", borderColor: "#9ED9B0" },
    { bgColor: "#FDF3E8", borderColor: "#EBC59A" },
    { bgColor: "#FCE9E7", borderColor: "#E8A5A0" },
    { bgColor: "#F4EBF7", borderColor: "#D5B3E6" },
    { bgColor: "#FBF6E3", borderColor: "#E7D28B" },
    { bgColor: "#E8F2F8", borderColor: "#A8CBE1" },
  ];
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = await getCategory();
      console.log(res);
      setCategories(res.data.category);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const filteredData = categories.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />{" "}
      <Text style={styles.headerTitle}>Find Products</Text>{" "}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#7C7C7C" />{" "}
        <TextInput
          style={styles.searchInput}
          placeholder="Search Store"
          placeholderTextColor="#7C7C7C"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const color = colors[index % colors.length];
            return (
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: color.bgColor,
                    borderColor: color.borderColor,
                  },
                ]}
              >
                <Image
                  source={{ uri: item.img }}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
                <Text style={styles.cardTitle}>{item.name}</Text>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", paddingHorizontal: 20 },
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
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14, color: "#181725" },
  listContent: { paddingBottom: 30 },
  row: { justifyContent: "space-between", marginBottom: 15 },
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
  cardImage: { width: 150, height: 150, marginBottom: 20 },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#181725",
    textAlign: "center",
    lineHeight: 22,
  },
});
