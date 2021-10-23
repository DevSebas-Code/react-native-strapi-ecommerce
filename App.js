import React, { useState, useMemo, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import AuthScreen from "./src/screens/Auth";
import AuthContext from "./src/context/AuthContext";
import { setTokenApi, getTokenApi, removeTokenApi } from "./src/api/token";
import jwtDecode from "jwt-decode";
import AppNavigation from "./src/navigation/AppNavigation";

export default function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
   

      
      //Existe Token?, si existe, setAuth recibe el Token y el idUser, de lo contrario setAuth se setea en null
      // Con jwtDecode decodifico el token de la sesion, y como la funcion jwtDecode devuelve un objeto, puedo acceder a su clave de id, o cualquier propiedad que pertenezca al objeto "token"
      if(token){
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        })
      }else{
        setAuth(null)
      }
    })();
  }, []);

  //User viene desde el LoginForm a traves del response que se proporciona por la peticion a la API de logon de strapi
  const login = (user) => {
    console.log(user);
    // JWT: Json Web Token,
    // Rescato el JWT accediendo a la propiedad JWT del objeto padre user, del response que me devuelve strapi
    setTokenApi(user.jwt);

    setAuth({
      token: user.jwt,
      //Rescato el id del user que realiza el login por medio de la propiedad del objeto hijo user del response que me devuelve strapi
      idUser: user.user.id,
    });
  };

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>
        {auth ? 
          <AppNavigation/>
         : 
          <AuthScreen />
        }
      </PaperProvider>
    </AuthContext.Provider>
  );
}
