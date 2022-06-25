import React from "react";
import { Alert } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

export default function Menu() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const logoutAccount = () => {
    Alert.alert(
      "Cerrar Sesión",
      "Esta seguro de que quieres salir de cuenta",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: () => logout(),
        },
      ],
      // La unica manera de cancelar la alerta es indicando NO o SI
      { cancelable: false }
    );
  };
  return (
    <>
      <List.Section>
        <List.Subheader>Mi cuenta</List.Subheader>
        <List.Item
          // Opciones de mi Cuenta

          title="Cambiar nombre"
          description="Cambia tu nombre"
          left={(props) => <List.Icon {...props} icon="face" />}
          onPress={() => navigation.navigate("change-name")}
        />
        <List.Item
          title="Cambiar Email"
          description="Cambia el email de tu cuenta"
          left={(props) => <List.Icon {...props} icon="at" />}
          onPress={() => navigation.navigate("change-email")}
        />
        <List.Item
          title="Cambiar Nombre de usuario"
          description="Cambia el nombre de usuario de  tu cuenta"
          left={(props) => <List.Icon {...props} icon="sim" />}
          onPress={() => navigation.navigate("change-username")}
        />
        <List.Item
          title="Cambiar la contraseña de tu cuenta"
          description="Cambia la contraseña de tu cuenta"
          left={(props) => <List.Icon {...props} icon="key" />}
          onPress={() => navigation.navigate("change-password")}
        />
        <List.Item
          title="Mis direcciones"
          description="Gestionar mis direcciones"
          left={(props) => <List.Icon {...props} icon="map" />}
          onPress={() => navigation.navigate("addresses")}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>App</List.Subheader>
        <List.Item
          title="Pedidos"
          description="Listado de todos los pedidos"
          left={(props) => <List.Icon {...props} icon="clipboard-list" />}
          onPress={() => console.log("Ir a mis pedidos")}
        />
        <List.Item
          title="Lista de deseos"
          description="Listado de todos los productos que te quieres comprar"
          left={(props) => <List.Icon {...props} icon="heart" />}
          onPress={() => navigation.navigate("favorites")}
        />
        <List.Item
          title="Cerrar sesión"
          description="Cierra esta sesión y inicia con otra"
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={logoutAccount}
        />
      </List.Section>
    </>
  );
}
