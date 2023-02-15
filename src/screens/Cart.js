import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getProductCartApi } from "../api/cart";
import { getAddressesApi } from "../api/address";
import { size } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StatusBarCustom from "../components/StatusBar";
import NotProducts from "../components/Cart/NotProduct";
import colors from "../styles/colors";
import useAuth from "../hooks/useAuth";
import ProductList from "../components/Cart/ProductList";
import AddressList from "../components/Cart/AddressList";
import Payment from "../components/Cart/Payment";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null)
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      setCart(null);
      setSelectedAddress(null);
      loadCart();
      loadAddresses();
    }, [])
  );

  useEffect(() => {
    reloadCart && loadCart();
  }, [reloadCart]);

  const loadCart = async () => {
    const response = await getProductCartApi();
    setCart(response);
  };

  const loadAddresses = async () => {
    const response = await getAddressesApi(auth);
    setAddresses(response);
  };

  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
      />
      {!cart || size(cart) === 0 ? (
        <NotProducts />
      ) : (
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <ScrollView style={styles.cartContainer}>
            <ProductList
              cart={cart}
              products={products}
              setProducts={setProducts}
              setReloadCart={setReloadCart}
              setTotalPayment={setTotalPayment}
            />
            <AddressList
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <Payment products={products} selectedAddress={selectedAddress} totalPayment={totalPayment}/>
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
  cartContainer: {},
});
