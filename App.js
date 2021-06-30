import React, { useState, useMemo, useEffect } from "react";
import { Text } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import AuthScreen from "./src/screens/Auth";
import AuthContext from "./src/context/AuthContext";
import { setTokenApi, getTokenApi } from "./src/api/token";

export default function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    setAuth(null);
    return () => {};
  }, []);
  // useEffect(() => {
  //   // Es null porque aun no sabemos si el usuario esta logeado

  //   //Como las funciones del localStorage son asincronas, se crea un afuncion autoejecutable
  //   (async () => {
  //     const token = await getTokenApi();
  //     if (token) {
  //       console.log("Estoy logeado");
  //       console.log(token);
  //       // setAuth("Hola");
  //     } else {
  //       setAuth(null);
  //     }
  //   })();
  // }, []);

  //User viene desde el LoginForm a traves del response que se proporciona por la peticion a la API de logon de strapi
  const login = (user) => {
    console.log(user);
    // JWT: Json Web Token, 
    // Rescato el JWT accediendo a la propiedad JWT del objeto padre user, del response que me devuelve strapi
    setTokenApi(user.jwt);

    setAuth({
      token: user.jwt,
      //Rescato el id del user que realiza el login por medio de la propiedad del objeto hijo user del response que me devuelve strapi
      idUser: user.user._id,
    });
  };
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout: () => null,
    }),
    [auth]
  );

  if (auth === undefined) {
    return null;
  }

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>
        {auth ? <Text>Zona de Usuarios</Text> : <AuthScreen />}
      </PaperProvider>
    </AuthContext.Provider>
  );
}
