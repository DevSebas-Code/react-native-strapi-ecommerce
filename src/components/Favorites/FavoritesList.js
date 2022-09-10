import { Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { map } from "lodash";
import Product from "./Product";

export default function FavoritesList({ products, setReloadFavorites }) {
 console.log("products: ", products)
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lista de Favoritos</Text>
      {map(products, (item) => (
        <Product key={item._id} item={item} setReloadFavorites={setReloadFavorites} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
});