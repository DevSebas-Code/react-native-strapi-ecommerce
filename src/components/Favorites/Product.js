import React, { useState } from "react";
import { View, StyleSheet, Text, Image, ActivityIndicator } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { API_URL } from "../../utils/constants";
import colors from "../../styles/colors";
import useAuth from "../../hooks/useAuth";
import { deleteFavoriteApi } from "../../api/favorite";
import { useNavigation } from "@react-navigation/native";

export default function Product({ item, setReloadFavorites }) {
  
  const navigation = useNavigation();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false)

  const deleteFavorite = async (id) => {
    setLoading(true)
    await deleteFavoriteApi(auth, id);
    setReloadFavorites(true);
    setLoading(false)
  };

  const goToProduct = (id) => {
    navigation.navigate("product", { idProduct: id });
  };
  const calcPrice = (price, discount) => {
    if (!discount) return price;

    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(3);
  };

  return (
    <View style={styles.product}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{ uri: `${API_URL}${item.product.main_image.url}` }}
        />
      </View>
      <View style={styles.info}>
        <View>
          <Text numberOfLines={3} ellipsizeMode="tail" style={styles.name}>
            {item.product.title}
          </Text>
        </View>
        <View style={styles.price}>
          <Text style={styles.currentPrice}>
            {calcPrice(item.product.price, item.product.discount)} CLP
          </Text>
          {item.product.discount && (
            <Text style={styles.oldPrice}>${item.product.price}</Text>
          )}
        </View>
        <View style={styles.btnsContainer}>
          <Button
            mode="contained"
            color={colors.primary}
            onPress={() => goToProduct(item.product._id)}
            style={styles.btnViewProduct}
            labelStyle={{fontSize: 12}}
          >
            Ver Producto
          </Button>
          <IconButton
            icon="close"
            color="#fff"
            size={16}
            style={styles.btnDelete}
            onPress={() => deleteFavorite(item.product._id)}
          />
        </View>
      </View>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#fff"  />
          </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "#000",
    backgroundColor: "#000",


  },
  containerImage: {
    width: "40%",
    height: 170,
    backgroundColor: "rgba(255, 255, 255, 0)",
    padding: 5,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
    borderRadius: 30,
  },
  info: {
    padding: 5,
    width: "60%",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    color: "#fff",
  },
  price: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "flex-end",
  },
  currentPrice: {
    color: "#fff",
    fontSize: 22,
    marginLeft: 5,
  },
  oldPrice: {
    marginLeft: 30,
    fontSize: 14,
    color: "#747474",
    textDecorationLine: "line-through",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    width: "100%",
    height: 40,
    fontSize: 8,
  },
  btnDelete: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    margin: 0,
    width: 60,
    height: 35,
    marginRight: 10,
    backgroundColor: "#A63939"
  },
  loading: {
    backgroundColor: "#000",
    opacity: 0.5,
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 5,
    justifyContent: "center",
  },
  btnViewProduct: {
    height: 35,
    borderRadius: 30,
  }
});
