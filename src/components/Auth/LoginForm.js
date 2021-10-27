import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { formStyle } from "../../styles";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { RootSiblingParent } from "react-native-root-siblings";
import { loginApi } from "../../api/user";
import * as Yup from "yup";



export default function LoginForm(props) {
  // console.log(props);
  const { changeForm } = props;


  // const debugForm = () =::
  const [loading, setLoading] = useState(false);

  // Declaramos el hook personalizado para la autenticación y se accede a la funcion de login()  por medio de destructuring
  const { login } = useAuth();

  console.log(login);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        setLoading(true);

        // Se declara la respuesta de la peticion a la API de Strapi
        //La respuesta viajara directo al componente padre APP.js, por lo que estariamos mandando props desde
        // un componente hijo a un componente padre, esta es una manera de poder pasar props hacia componentes superiores o padres
        // mediante una funcion externa importada mediante destructuring como se puede observar en la parte superior de la hoja del codigo
        //donde se llama al hook personalizado o custom que se creo en la carpeta ../hooks/**useAuth()**

        setLoading(true)
        const response = await loginApi(formData);
        setLoading(false);
        if (response.statusCode) throw "Error en el usuario o contraseña";

        login(response);

        // console.log(response);
      } catch (error) {
        11
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  return (

    <View>

    
      <TextInput
        label="Email o Nombre de usuario "
        selectionColor="#fff"
        outlineColor="#fff"
        style={formStyle.input}
        theme={{colors : {text : formStyle.input.color}}}
        onChangeText={(text) => formik.setFieldValue("identifier", text)}
        value={formik.values.identifier}
        error={formik.errors.identifier}
      />
      <TextInput
        label="Contraseña"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        theme={{colors : {text : formStyle.input.color}}}
        value={formik.values.password}
        error={formik.errors.password}
        secureTextEntry
      />
      <RootSiblingParent>
        <Button
          mode="contained"
          style={formStyle.btnSucces}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Entrar
        </Button>
      </RootSiblingParent>
      <Button
        mode="text"
        style={formStyle.btnText}
        labelStyle={formStyle.btnTextLabel}
        onPress={changeForm}
      >
        Registrarse
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    //Este value se declara con nombre identifier ya que puede ser el mail como username del usuario
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string().required(true),
    password: Yup.string().required(true),
  };
}

const styles = StyleSheet.create({})