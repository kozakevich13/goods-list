import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductListScreen = ({ navigation }) => {
  const PRODUCTS_API = "https://fakestoreapi.com/products";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const checkSavedProducts = async () => {
      try {
        const savedProducts = await AsyncStorage.getItem("products");
        if (savedProducts && savedProducts !== "") {
          console.log("дані беруться з локального сховища");
          setProducts(JSON.parse(savedProducts));
        } else {
          console.log("дані беруться з API");
          fetchProductsFromAPI();
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkSavedProducts();
  }, []);

  const fetchProductsFromAPI = async () => {
    console.log("fetchProductsFromAPI works");
    try {
      const response = await fetch(PRODUCTS_API);
      const data = await response.json();
      console.log(data);

      await AsyncStorage.setItem("products", JSON.stringify(data));
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductPress = (product) => {
    navigation.navigate("ProductDetails", { productId: product.id });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => handleProductPress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список товарів</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonLabel}>Додати товар</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "gray",
  },
});

export default ProductListScreen;
