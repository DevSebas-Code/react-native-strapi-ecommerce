import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ProductStack from "./ProductStack";
import Favorites from "../screens/Favorites";
import AccountStack from "./AccountStack";
import Cart from "../screens/Cart";
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
        //Accedo a la route mediante destructuring
        screenOptions={({ route }) => ({
          tabBarIcon: (routeStatus) => {
            return setIcon(route, routeStatus);
          },
        })}
      >
        <Tab.Screen
          name="home"
          component={ProductStack}
          options={{
            title: "Inicio",
          }}
        />
        <Tab.Screen
          name="favorites"
          component={Favorites}
          options={{
            title: "Favoritos",
          }}
        />
        <Tab.Screen
          name="cart"
          component={Cart}
          options={{
            title: "Carrito",
          }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{
            title: "Mi cuenta",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function setIcon(route, routeStatus) {
  let iconName = "";
  switch (route.name) {
    case "home":
      iconName = "home";
      break;
    case "favorites":
      iconName = "heart";
      break;
    case "cart":
      iconName = "shopping-cart";
      break;
    case "account":
      iconName = "bars" 
    default:
      break;
  }
  return <AwesomeIcon name={iconName} style={styles.icon} />;
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: colors.bgDark,
  },
  icon: {
    fontSize: 20,
    color: colors.fontLight,
  },
});
