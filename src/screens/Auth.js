import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import logo from "../../assets/logo.png";
// lamando inplicitamente al index.js que es el global de los estilos
import { layoutStyle } from "../styles";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

export default function Auth() {
  // Este estado permitira determinar si se muestra el formulario de registro o el formulario de login
  const [showLogin, setShowLogin] = useState(true);

  const changeForm = () => setShowLogin(!showLogin);

  return (
    <View style={layoutStyle.container}>
      <Image style={styles.logo} source={logo} />

      {/* Plaform.OS devuelve el OS del usuario, si es IOS aplica padding, si no, aplica height para el caso de Android */}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {showLogin ? (
          <LoginForm changeForm={changeForm} />
        ) : (
          <RegisterForm changeForm={changeForm} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 50,
    resizeMode: "contain",
    marginBottom: 20,
  },
});
