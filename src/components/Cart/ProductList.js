import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { map } from "lodash";
import ScreenLoading from "../../components/ScreenLoading";
import { getProductApi } from "../../api/product";
import Product from "./Product";
export default function ProductList({
  cart,
  products,
  setProducts,
  setReloadCart,
  setTotalPayment,
}) {
  const calcPrice = (price, discount) => {
    if (!discount) return price;

    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(3);
  };
  useEffect(() => {
    setProducts(null);
    (async () => {
      const productTemp = [];
      let totalPaymentTemp = 0;
      for await (const product of cart) {
        const response = await getProductApi(product.idProduct);
        response.quantity = product.quantity;
        productTemp.push(response);
        const priceProduct = calcPrice(response.price, response.discount);
        totalPaymentTemp += priceProduct * product.quantity;
        totalPaymentTemp.toFixed(3)
      }
      setProducts(productTemp);
      setTotalPayment(totalPaymentTemp);
    })();
  }, [cart]);

  return (
    <View>
      <Text style={styles.title}>Productos: </Text>
      {!products ? (
        <View style={styles.loaderContainer}>
          <ScreenLoading text="Cargando carrito" />
        </View>
      ) : (
        map(products, (product) => (
          <Product
            key={product._id}
            product={product}
            setReloadCart={setReloadCart}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 17,
    fontSize: 18,
    fontWeight: "bold",
  },
  loaderContainer: {
    position: "relative",
    left: 0,
    right: 0,
    top: 20,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
