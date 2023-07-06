import React from "react";
import { View, Text } from "react-native";

const ProductDetailsScreen = ({ route }) => {
  const { productId } = route.params;

  return (
    <View>
      <Text>Product Details Screen</Text>
      <Text>Product ID: {productId}</Text>
    </View>
  );
};

export default ProductDetailsScreen;
