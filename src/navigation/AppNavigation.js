import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../screens/Home";
import Favorites from "../screens/Favorites";
import Cart from "../screens/Cart";
import Account from "../screens/Account"
const Tab = createMaterialBottomTabNavigator();

// Aqui declararemos toda la logica de navegacion en lo que respecta al menu de la aplicacion

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
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
