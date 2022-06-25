import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { searchProductsApi } from "../../api/search";
import { size } from "lodash";
import StatusBar from "../../components/StatusBar";
import colors from "../../styles/colors";
import  ScreenLoading from "../../components/ScreenLoading"; 
import Search from "../../components/Search";
import ResultNotFound from "../../components/Search/ResultNotFound";
import ProductList from "../../components/Search/ProductList";
export default function SearchScreen(props) {
  const { route } = props;
  const { params } = route;
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      setProducts(null);
      const response = await searchProductsApi(params.search);
      setProducts(response);
    })();
  }, [params.search]);

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <Search currentSearch={params.search} />
      {!products ? (
        <View style={styles.container}>
          <ScreenLoading text="Buscando productos"/>
        </View>
        // <Text>Buscando Productos</Text>
      ) : size(products) === 0 ? (
        <ResultNotFound search={params.search} />
      ) : (
       
        <ProductList products ={products} />
      )}
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})