import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { map } from "lodash";
import colors from "../../styles/colors";
import { API_URL } from "../../utils/constants";

export default function ProductList({ products }) {

  const navigation = useNavigation();
  

  const calcPrice = (price, discount) => {
    console.log({ price });
    console.log({ discount });
    if (!discount) return price;

    const discountAmount = (price * discount) / 100;

    return (price - discountAmount).toFixed(2);
  };

  const goToProduct = (id) => {
    navigation.push("product", { idProduct : id})
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>RESULTADOS</Text>
      {map(products, (product) => (
        <TouchableNativeFeedback
          key={product._id}
          onPress={() => goToProduct(product._id)}
        >
          <View style={styles.product}>
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{ uri: `${API_URL}${product.main_image.url}` }}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
                {product.title}
              </Text>
              <View style={styles.prices}>
                <Text style={styles.currentPrice}>
                  {calcPrice(product.price, product.discount)} CLP
                </Text>
                {product.discount && (
                  <Text style={styles.oldPrice}>{product.price} CLP</Text>
                )}
              </View>
              <Button style={styles.btn} color={colors.primary}>
                Ver producto
              </Button>
            </View>
          </View>
        </TouchableNativeFeedback>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#dadde1",
  },
  containerImage: {
    width: "40%",
    height: 200,
    backgroundColor: "#ebebeb",
    borderRadius: 30,
    padding: 5,
  },
  image: {
    height: 200,
    width: 150,
    resizeMode: "contain",
  },
  info: {
    padding: 10,
    width: "60%",
  },
  name: {
    fontSize: 16,
  },
  prices: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 5,
  },
  currentPrice: {
    fontSize: 16,
  },
  oldPrice: {
    marginLeft: 7,
    fontSize: 14,
    color: "#747474",
    textDecorationLine: "line-through",
  },
  btn: {
    position: "absolute",
    // top: 0,
    bottom: 15,
    left: 0,
    right: 0,
  },
});
