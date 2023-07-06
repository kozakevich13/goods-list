import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Введіть назву товару"),
  price: yup
    .number()
    .required("Введіть ціну товару")
    .positive("Ціна повинна бути позитивним числом"),
  description: yup.string().required("Введіть опис товару"),
});

const AddProductScreen = () => {
  const handleFormSubmit = (values) => {
    console.log(values);
    // Виконати додаткову логіку для збереження товару
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Додати товар</Text>
      <Formik
        initialValues={{ name: "", price: "", description: "" }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Назва товару"
              onChangeText={handleChange("name")}
              value={values.name}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

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

export default AddProductScreen;
