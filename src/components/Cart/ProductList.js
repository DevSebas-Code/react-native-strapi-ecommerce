import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { map } from "lodash";
import ScreenLoading from "../../components/ScreenLoading";
import { getProductApi } from "../../api/product";
import Product from "./Product";
export default function ProductList({ cart, products, setProducts, setReloadCart }) {
  useEffect(() => {
    setProducts(null);
    (async () => {
      const productTemp = [];
      for await (const product of cart) {
        const response = await getProductApi(product.idProduct);
        response.quantity = product.quantity;
        productTemp.push(response);
      }
      setProducts(productTemp);
    })();
  }, [cart]);

  return (
    <View>
      <Text style={styles.title}>Productos: </Text>
      {!products ? (
        <View style={styles.loaderContainer}>
          <ScreenLoading text="Cargando carrito" size="large" />
        </View>
      ) : (
        map(products, (product) => (
          <Product key={product._id} product={product} setReloadCart={setReloadCart} />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loaderContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
