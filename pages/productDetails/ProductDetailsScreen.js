import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetailsScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductFromStorage = async () => {
      try {
        const savedProducts = await AsyncStorage.getItem("products");
        if (savedProducts) {
          const products = JSON.parse(savedProducts);
          const selectedProduct = products.find(
            (item) => item.id === productId
          );
          if (selectedProduct) {
            setProduct(selectedProduct);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductFromStorage();
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});
const MemoizedProductDetailsScreen = React.memo(ProductDetailsScreen);
export default MemoizedProductDetailsScreen;
