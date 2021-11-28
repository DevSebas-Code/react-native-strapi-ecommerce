import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import { TextInput, Button } from "react-native-paper";
// por medio de Destructuring llamo al hook de formik useFormik()
import { useFormik } from "formik";
import * as Yup from "yup";
//importamos Toast para los mensajes de feedback para  el user
import Toast from "react-native-root-toast";
import { registerApi } from "../../api/user";
import { formStyle } from "../../styles";
import { CardStyleInterpolators } from "@react-navigation/stack";

export default function RegisterForm(props) {
  const { changeForm } = props;

  //Example

  // Toast.show("Prueba toast", {
  //   position: Toast.positions.CENTER,
  // });

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    //A traves del Hook useFormik() la property de initialValues,
    //se le esta pasando la funcion initialValues(), que se declara en la parte inferior de la page, donde se  da valor inicial a los campos del form (formData),
    //en este caso los valores comenzaran como string vacio = "".
    
    
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        await registerApi(formData);
        changeForm();
        // console.log("OK");
      } catch (error) {
        setLoading(false);
        console.log(error);
        Toast.show("Error al registrar el usuario", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  return (
    <View>
      {/* En caso de querer añadir mas de 1 estilo al input se debe declarar dentro de un array, ej : {[formStyle.input, formStyle.btnText]} */}
      <TextInput
        label="Email"
        style={CardStyleInterpolators.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }} underlineColor="#f5f5f5" underlineColorAndroid="#f5f5f5"
        value={formik.values.email}
        error={formik.errors.email}
      />
      <TextInput
        label="Nombre de usuario"
        style={styles.input}
        onChangeText={(text) => formik.setFieldValue("username", text)}
        value={formik.values.username}
        theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }} underlineColor="#f5f5f5" underlineColorAndroid="#f5f5f5"
        error={formik.errors.username}
      />
      <TextInput
        label="Contraseña"
        onChangeText={(text) => formik.setFieldValue("password", text)}
        style={styles.input}
        value={formik.values.password}
        theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }} underlineColor="#f5f5f5" underlineColorAndroid="#f5f5f5"
        error={formik.errors.password}
        secureTextEntry
      />
      <TextInput
        label="Repetir Contraseña"
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        style={styles.input}
        value={formik.values.repeatPassword}
        theme={{ colors: { text: "#f5f5f5", accent: "#ffffff", primary: "#a3d1ff", placeholder: "#f5f5f5", background: "transparent" } }} underlineColor="#f5f5f5" underlineColorAndroid="#f5f5f5"
        error={formik.errors.repeatPassword}
        secureTextEntry
      />

      <Button
        mode="contained"
        style={formStyle.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Registrarse
      </Button>

      <Button
        mode="text"
        style={formStyle.btnText}
        labelStyle={formStyle.btnTextLabel}
        onPress={changeForm}
      >
        Iniciar Sesion
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  };
}


//ValidationSchema de Yup
function validationSchema() {
  return {
    email: Yup.string().email(true).required(),
    username: Yup.string().required(true),
    password: Yup.string().required(true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}



const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff'
  },
})