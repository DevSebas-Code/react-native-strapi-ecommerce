import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import React from "react";

export default function Favorite(props) {
  const { product } = props;

  const addFavorite = () => {
    console.log("producto añadido a la lista de Favoritos");
    console.log(product.title);
  };
  return (
    <View style={{zIndex: 1}}>
      <Button
        mode="contained"
        contentStyle={styles.btnAddFavoritesContent}
        labelStyle={styles.btnLabel}
        style={styles.btn}
        onPress={addFavorite}
      >
        Añadir a Favoritos
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btnAddFavoritesContent: {
    backgroundColor: "#057b00",
    paddingVertical: 5,
  },
  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
    borderRadius: 18
  },
});
