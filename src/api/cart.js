import AsyncStorage from "@react-native-async-storage/async-storage";

import { size, map, filter } from "lodash";

import { API_URL, CART } from "../utils/constants";

export async function getProductCartApi() {
  try {
    const cart = await  AsyncStorage.getItem(CART);
    console.log("CART GET : ", cart);
    if (!cart) return [];
    console.log("JSON.parse: ", JSON.parse(cart));
    return JSON.parse(cart);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addProductCartApi(idProduct, quantity) {
  console.log("idProduct: " + idProduct);
  console.log("quantity: " + quantity);
  try { 
    const cart = await getProductCartApi();
    if(!cart) throw "Error al obtener el carrito"
    if (size(cart) === 0) {
      cart.push({
        idProduct,
        quantity,
      });
    } else {
      let found = false;
      map(cart, (product) => {
        if (product.idProduct === idProduct) {
          product.quantity += quantity;
          found = true;
          return product;
        }
      });

      if (!found) {
        cart.push({
          idProduct,
          quantity,
        });
      }
    }
    await AsyncStorage.setItem(CART, JSON.stringify(cart));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
