import React, { useEffect, useState } from "react";
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    useWindowDimensions,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import AddToCartButton from "@/components/productDetailsComp/AddToCartButton";
import ProductCard from "@/components/FavouritComponents/ProductsCard";
import { getProducts } from "@/api/Product.Servise";

interface Product {
    id: number;
    title: string;
    price: number;
    img: string;
}

export default function FavouriteScreen() {

    const { width, height } = useWindowDimensions();
    const normalize = (size: number) => {
        return (size / 375) * width;
    };

    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);

    const fetchData = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addAllToCart = () => {
        setCart((prevCart) => [...prevCart, ...products]);
        console.log("Products added to cart");
    };

    const addSingleProduct = (id: number) => {
        console.log("Single product added:", id);
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
                <Text
                    style={[
                        styles.textTitle,
                        { fontSize: normalize(22) },
                    ]}
                >
                    Favourite
                </Text>

                <View
                    style={{
                        width: width * 0.9,
                        alignSelf: "center",
                    }}
                >

                    {products?.map(({ id, title, price, img }) => (
                        <View key={id}>
                            <ProductCard
                                image={{ uri: img }}
                                title={title}
                                price={price}
                                onPress={() => addSingleProduct(id)}
                            />
                        </View>
                    ))}
                    <AddToCartButton onPress={addAllToCart} />
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
    keyboard: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 20,
    },
    textTitle: {
        alignSelf: "center",
        fontWeight: "bold",
        marginBottom: 20,
    },
});