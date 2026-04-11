import React, { useState, useEffect, use } from 'react';
import { StyleSheet,Text,View,TouchableOpacity,Pressable,} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getProductById } from "@/api/Product.Servise";
import { Ionicons } from '@expo/vector-icons';
import { Icon, IconButton} from 'react-native-paper';

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState<any>({});
  const { id } = useLocalSearchParams();
  const [count, setCount] = useState(1);
  const increseCount = () => {
    setCount(count + 1);
  };
  const decreseCount = () => {
    setCount(count - 1);
  };
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetechData = async () => {
    const response = await getProductById(id);
    setProductDetails(response.data);
  };

  useEffect(() => {
    fetechData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topCard}>
        <Image
          source={{ uri: 'https://img.freepik.com/free-psd/fresh-red-apple-with-single-green-leaf-stem-sits-isolated-against-solid-black-background_84443-59661.jpg?semt=ais_hybrid&w=740&q=80' }}
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Naturel Red Apple</Text>

          <Pressable onPress={() => setIsFavorite(!isFavorite)}>
            <IconButton
                icon={isFavorite ? "heart" : "heart-outline"}
                iconColor={isFavorite ? "red" : "gray"}
                size={28}
                onPress={() => setIsFavorite(!isFavorite)}
              />
          </Pressable>
        </View>

        <Text style={styles.weight}>1kg, Price</Text>

        <View style={styles.priceRow}>
          <View style={styles.counter}>
            <Pressable
              onPress={decreseCount}
              disabled={count == 1}
            >
              <Ionicons name="remove" size={24} color="gray" />
            </Pressable>

            <View style={styles.countBox}>
              <Text>{count}</Text>
            </View>

            <Pressable onPress={increseCount}>
              <Ionicons name="add" size={24} color="green" />
            </Pressable>
          </View>

          <Text style={styles.price}>$2</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.detailTitle}>Product Detail</Text>
        <Text style={styles.description}>
          Apples are nutritious and good for your heart. Perfect for a healthy snack.
        </Text>

        <View style={styles.divider} />

        <View style={styles.listRow}>
          <Text style={styles.rowTitle}>Nutritions</Text>

          <View style={styles.tagBox}>
            <Text style={styles.tagText}>100 gr</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.listRow}>
          <Text style={styles.rowTitle}>Review</Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((i) => (
            <Icon 
              key={i} 
              source={i <= (productDetails.rating || 2) ? "star" : "star-outline"} 
              color="orange" 
              size={20}
             />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.mainButton}>
          <Text style={styles.buttonText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  topCard: {
    backgroundColor: '#f2f3f2',
    height: '35%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 200,
    height: 200,
  },

  content: {
    padding: 20,
    flex: 1,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  weight: {
    color: 'gray',
    marginTop: 5,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },

  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  countBox: {
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 10,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 9,
    paddingBottom: 9,
    marginRight: 10,
    marginLeft: 10,
  },

  price: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  divider: {
    height: 1,
    backgroundColor: 'lightgray',
    marginTop: 15,
    marginBottom: 15,
  },

  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  description: {
    color: 'gray',
    marginBottom: 35,
  },

  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  rowTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  tagBox: {
    backgroundColor: '#EBEBEB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 10,
  },

  tagText: {
    fontSize: 12,
    color: '#7C7C7C',
    fontWeight: 'bold',
  },

  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
    
  },

  mainButton: {
    backgroundColor: 'green',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetails;