import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../screens/Home";
import Favorites from "../screens/Favorites";
import Cart from "../screens/Cart";
import Account from "../screens/Account";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors";
//La variable Tab, llama a la FN createMaterialBottomTabNavigator()

const Tab = createMaterialBottomTabNavigator();

// Aqui declararemos la estrucutra del menu de navegacion inferior de la APP.
// El prop component se encargara de mostrar la pantalla especifica, la cual puede ser Home, Favorites, Cart y Account

console.log(colors);

export default function AppNavigation() {
  return (
    //
    <NavigationContainer>
      <Tab.Navigator
        barStyle={styles.navigation}
        screenOptions={({ route }) => ({
          tabBarIcon: (routeStatus) => {
            return setIcon(route, routeStatus);
          },
        })}
      >
        <Tab.Screen
          name="home"
          component={Home}
          option={{
            title: "Inicio",
          }}
        />
        <Tab.Screen
          name="favorites"
          component={Favorites}
          option={{
            title: "Favoritos",
          }}
        />
        <Tab.Screen
          name="cart"
          component={Cart}
          option={{
            title: "Carrito",
          }}
        />
        <Tab.Screen
          name="account"
          component={Account}
          option={{
            title: "Mi cuenta",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const setIcon = (route, routeStatus) => {
  console.log(route);
  console.log("########");
  console.log("########");
 
  console.log(routeStatus);
  return null;
};

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: colors.bgDark,
  },
});
