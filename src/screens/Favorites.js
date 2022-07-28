import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import StatusBar from "../components/StatusBar";

import colors from "../styles/colors";
import Search from "../components/Search";
import ScreenLoading from "../components/ScreenLoading";
import useAuth from "../hooks/useAuth";
import { size } from "lodash";
import FavoriteList from "../components/Favorites/FavoritesList";
import { useFocusEffect } from "@react-navigation/native";
import { getFavoriteApi } from "../api/favorite";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function Favorites() {
  const [products, setProducts] = useState(null);
  const { auth } = useAuth();
  const [reloadFavorites, setReloadFavorites] = useState(false)
  useFocusEffect(
    useCallback(() => {
      (async () => {
        setProducts(null);
        const response = await getFavoriteApi(auth);
        setProducts(response);
      })();
      
      setReloadFavorites(false)
    }, [reloadFavorites])
  );

  return (
    <SafeAreaProvider>
    <>


      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <Search />
      {!products ? (
        <View style={styles.loaderContainer}>
          <ScreenLoading text="Cargando Lista" />
        </View>
      ) : size(products) === 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Lista de Favoritos</Text>
          <Text>No tienes productos en tu lista</Text>
        </View>
      ) : (
        <FavoriteList products={products} setReloadFavorites={setReloadFavorites} />
      )}
    </>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 5,
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
