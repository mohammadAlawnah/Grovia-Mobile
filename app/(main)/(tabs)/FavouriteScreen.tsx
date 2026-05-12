import React from "react";
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    useWindowDimensions,
    Pressable,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ProductCard from "@/components/FavouritComponents/ProductsCard";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavouriteScreen() {
    const { width, height } = useWindowDimensions();
    const router = useRouter();
    const { favorites, clearFavorites } = useFavorites();
    const goToProductDetails = (id: number) => {
        router.push(`/product/${id}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContainer,
                    {
                        minHeight: height,
                        paddingHorizontal: width * 0.05,
                    },
                ]}
            >
                <Text style={styles.textTitle}>Favourite</Text>

                <View style={styles.wrapper}>
                    {favorites?.length > 0 ? (
                        favorites.map(({ id, title, price, img }) => (
                            <View key={id} style={styles.card}>
                                <ProductCard
                                    image={{ uri: img }}
                                    title={title}
                                    price={price}
                                    onPress={() => goToProductDetails(id)}
                                />
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyText}>
                            No favorite products yet
                        </Text>
                    )}

                    {favorites.length > 0 && (
                        <Pressable
                            onPress={clearFavorites}
                            style={styles.clearButton}
                        >
                            <Text style={styles.clearText}>
                                Clear All Favorites
                            </Text>
                        </Pressable>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 20,
    },
    textTitle: {
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    wrapper: {
        width: "90%",
        alignSelf: "center",
    },
    card: {
        marginBottom: 12,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 16,
        color: "gray",
    },
    clearButton: {
        marginTop: 25,
        backgroundColor: "#53B175",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    clearText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});