import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import StatusBarCustom from "../components/StatusBar";
import { size } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NotProducts from "../components/Cart/NotProduct";
import colors from "../styles/colors";
import { getProductCartApi } from "../api/cart";
import ProductList from "../components/Cart/ProductList";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null)
  const [reloadCart, setReloadCart] = useState(false)

  useFocusEffect(useCallback(() => {
    setCart(null)
    loadCart()
  }, []));

  useEffect(() => {
    reloadCart && loadCart()
  }, [reloadCart])
  

const loadCart  = async  () => {
  const response = await getProductCartApi()
  setCart(response)
  // setCart(response)
}

  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
     {!cart && size(cart) === 0 ? (
      <NotProducts/>
     ):(
      <KeyboardAwareScrollView extraScrollHeight={25}>
          <ScrollView style={styles.cartContainer}>
          <ProductList cart={cart} products={products} setProducts={setProducts} setReloadCart={setReloadCart}/>
          </ScrollView>
      </KeyboardAwareScrollView>
     )}
    </>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  cartContainer: {

  }
});
