import { Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { map } from "lodash";
import Product from "./Product";

export default function FavoritesList({ products, setReloadFavorites }) {
  // const [first, setfirst] = useState(second)
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
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
