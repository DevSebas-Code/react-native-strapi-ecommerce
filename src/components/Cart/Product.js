import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import React, { useEffect } from "react";
import { deleteProductCartApi } from "../../api/cart";
import { Button, IconButton } from "react-native-paper";
import { API_URL } from "../../utils/constants";
import { increaseProductCartApi, decreaseProductCartApi } from "../../api/cart";
import colors from "../../styles/colors";

export default function Product({ product, setReloadCart }) {
  useEffect(() => {
    setReloadCart(null);
  });

  const calcPrice = (price, discount) => {
    if (!discount) return price;
    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(3);
  };

  const deleteProductCart = async () => {
    const response = await deleteProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  const increaseProductCart = async () => {
    const response = await increaseProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  const decreaseProductCart = async () => {
    const response = await decreaseProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  return (
    <View style={styles.product}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{ uri: `${API_URL}${product.main_image.url}` }}
        />
      </View>
      <View style={styles.info}>
        <View>
          <View>
            <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
              {product.title}
            </Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.currentPrice}>
              {calcPrice(product.price, product.discount)} CLP
            </Text>
          </View>

          {product.discount && (
            <View style={styles.containerDiscount}>
              <Text style={styles.discountText}>Ahorras:</Text>
              <Text style={styles.discountValue}>
                {((product.price * product.discount) / 100).toFixed(3)} CLP (
                {product.discount}%)
              </Text>
            </View>
          )}
        </View>

        <View style={styles.btnsContainer}>
          <View style={styles.selectQuantity}>
            <IconButton
              icon="plus"
              color="#fff"
              size={19}
              style={styles.btnQuantity}
              onPress={increaseProductCart}
            />
            <TextInput
              style={styles.inputQuantity}
              value={product.quantity.toString()}
            />
            <IconButton
              icon="minus"
              color="#fff"
              size={19}
              style={styles.btnQuantity}
              onPress={decreaseProductCart}
            />
          </View>
          <Button color="#b12704" mode="contained" onPress={deleteProductCart}>
            Eliminar
          </Button>
        </View>
      </View>
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
    padding: 7,
    marginLeft: 10,
    marginRight: 10,
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
    padding: 10,
    width: "60%",
    justifyContent: "space-between",
  },
  name: {
    color: "#fff",
    fontSize: 16,
  },
  price: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "flex-end",
  },
  currentPrice: {
    fontSize: 18,
    color: "#b12704",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    width: "100%",
  },
  selectQuantity: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnQuantity: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    margin: 0,
  },
  inputQuantity: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#fff",
  },
  containerDiscount: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  discountText: {
    fontSize: 14,
    color: "#747474",
  },
  discountValue: {
    fontSize: 14,
    color: "#747474",
    paddingLeft: 5
  },
});
