import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "Mi Cuenta", headerShown: false }}
      />
      <Stack.Screen
        name="change-password"
        component={Account}
        options={{ title: "Cambiar contraseña", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
