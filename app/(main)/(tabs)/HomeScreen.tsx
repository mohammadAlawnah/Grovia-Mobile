import React, { useEffect, useState } from "react";
import {Button, FlatList, ScrollView, StatusBar, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getProductsByCategory } from "@/api/Product.Servise";
import Banner from "@/components/HomeComponents/Banner";
import HomeHeader from "@/components/HomeComponents/HomeHeader";
import ProductCard, {
  ProductItem,
} from "@/components/HomeComponents/ProductCard";
import SearchBar from "@/components/HomeComponents/SearchBar";
import SectionHeader from "@/components/HomeComponents/SectionHeader";
import * as SecureStore from "expo-secure-store";
import {router} from "expo-router";
import LogoutButton from "@/components/Logout/Logout";

export default function HomeScreen() {
  const [fruits, setFruits] = useState<ProductItem[]>([]);
  const [MeatAndFish, setMeatAndFish] = useState<ProductItem[]>([]);
  const [dairyAndEggs, setDairyAndEggs] = useState<ProductItem[]>([]);

  const getData = async () => {
    try {
      const fruitsData = await getProductsByCategory(
        "Frash Fruits & Vegetable",
      );
      const meatAndFishData = await getProductsByCategory("Meat & Fish");
      const dairyAndEggsData = await getProductsByCategory("Dairy & Eggs");

      setFruits(fruitsData.data.products);
      setMeatAndFish(meatAndFishData.data.products);
      setDairyAndEggs(dairyAndEggsData.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <SearchBar value={search} onChangeText={setSearch} />
        <Banner />

        <SectionHeader title="Frash Fruits & Vegetable" />
        <FlatList
          data={fruits}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => <ProductCard item={item} />}
        />

        <SectionHeader title="Meat & Fish" />
        <FlatList
          data={MeatAndFish}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.horizontalList, { paddingBottom: 30 }]}
          renderItem={({ item }) => <ProductCard item={item} />}
        />
        <Banner />

        <SectionHeader title="Dairy & Eggs" />
        <FlatList
          data={dairyAndEggs}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.horizontalList, { paddingBottom: 30 }]}
          renderItem={({ item }) => <ProductCard item={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  horizontalList: {
    paddingBottom: 22,
  },
});
