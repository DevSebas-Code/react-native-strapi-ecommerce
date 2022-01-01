import React, { useState,useEffect } from "react";
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
import {Video} from 'expo-av'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Auth() {
  // Este estado permitira determinar si se muestra el formulario de registro o el formulario de login
  const [showLogin, setShowLogin] = useState(true);
  const video = React.useRef(null);
  const [status, setStatus] = useState({})
  const changeForm = () => setShowLogin(!showLogin);

  return (
    <View style={layoutStyle.container}>

      <Video
        ref={video}
        style={styles.video}
        source={require('./video.mp4')}
        resizeMode="cover"
        isLooping
        shouldPlay={true}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <Image style={styles.logo} source={logo} />

      {/* Plaform.OS devuelve el OS del usuario, si es IOS aplica padding, si no, aplica height para el caso de Android */}

      <KeyboardAwareScrollView
      enableOnAndroid={true}
     
      >
        {showLogin ? (
          <LoginForm changeForm={changeForm} />
        ) : (
          <RegisterForm changeForm={changeForm} />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  logo: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
    bottom: 30
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});
