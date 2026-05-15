import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface Product {
    id: number;
    title: string;
    price: number;
    img: string;
}

interface FavoritesContextType {
    favorites: Product[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (id: number) => void;
    isFavorite: (id: number) => boolean;
    clearFavorites: () => void;
}

const FavoritesContext =
    createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({children,}: any) => {
    const [favorites, setFavorites] = useState<Product[]>([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const data = await AsyncStorage.getItem("favorites");

            if (data) {
                setFavorites(JSON.parse(data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const saveFavorites = async (items: Product[]) => {
        try {
            await AsyncStorage.setItem(
                "favorites",
                JSON.stringify(items)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const addToFavorites = async (product: Product) => {
        const updated = [...favorites, product];
        setFavorites(updated);
        await saveFavorites(updated);
    };

    const removeFromFavorites = async (id: number) => {
        const updated = favorites.filter(
            (item) => item.id !== id
        );
        setFavorites(updated);
        await saveFavorites(updated);
    };

    const clearFavorites = async () => {
        setFavorites([]);
        await AsyncStorage.removeItem("favorites");
    };

    const isFavorite = (id: number) => {
        return favorites.some((item) => item.id === id);
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                isFavorite,
                clearFavorites,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error(
            "useFavorites must be used inside FavoritesProvider"
        );
    }
    return context;
};