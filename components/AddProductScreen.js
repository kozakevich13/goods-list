import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = yup.object().shape({
  title: yup.string().required("Введіть назву товару"),
  price: yup
    .number()
    .required("Введіть ціну товару")
    .positive("Ціна повинна бути позитивним числом"),
  description: yup.string().required("Введіть опис товару"),
});

const AddProductScreen = () => {
  const handleFormSubmit = async (values) => {
    try {
      const savedProducts = await AsyncStorage.getItem("products");
      let products = [];
      if (savedProducts) {
        products = JSON.parse(savedProducts);
      }

      const newProduct = {
        id: products.length + 1,
        ...values,
      };
      products.push(newProduct);

      await AsyncStorage.setItem("products", JSON.stringify(products));

      navigation.navigate("ProductList");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Додати товар</Text>
      <Formik
        initialValues={{
          title: "",
          price: "",
          description: "",
          image: "https://cataas.com/cat/says/hello%20world!",
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Назва товару"
              onChangeText={handleChange("title")}
              value={values.title}
            />
            {errors.title && <Text style={styles.error}>{errors.title}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Ціна товару"
              onChangeText={handleChange("price")}
              value={values.price}
              keyboardType="numeric"
            />
            {errors.price && <Text style={styles.error}>{errors.price}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Опис товару"
              onChangeText={handleChange("description")}
              value={values.description}
            />
            {errors.description && (
              <Text style={styles.error}>{errors.description}</Text>
            )}

            <Button title="Додати товар" onPress={handleSubmit} />
          </>
        )}
      </Formik>
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});
const MemoizedAddProductScreen = React.memo(AddProductScreen);
export default MemoizedAddProductScreen;
