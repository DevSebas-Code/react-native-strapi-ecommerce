import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { formStyle } from "../../styles";
import colors from "../../styles/colors";
import { useFormik } from "formik";
import { WebpayPlus } from "transbank-sdk";
import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk'; // ES6 Modules
import * as Yup from "yup";


const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));




export default function Payment({ products, selectedAddress, totalPayment }) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      console.log("Realizando Pago");
      console.log(formData);
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Forma de Pago</Text>
      <TextInput
        label="Nombre de la tarjeta"
        style={formStyle.input}
        onChangeText={(text) => {
          formik.setFieldValue("name", text);
        }}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label="Numero de la tarjeta"
        style={formStyle.input}
        onChangeText={(text) => {
          formik.setFieldValue("number", text);
        }}
        value={formik.values.number}
        error={formik.errors.number}
      />

      <View style={styles.containerInput}>
        <View style={styles.containerMonthYearInput}>
          <TextInput
            label="Mes"
            style={styles.inputDate}
            onChangeText={(text) => {
              formik.setFieldValue("expo_month", text);
            }}
            value={formik.values.expo_month}
            error={formik.errors.expo_month}
          />
          <TextInput
            label="Año"
            style={styles.inputDate}
            onChangeText={(text) => {
              formik.setFieldValue("expo_year", text);
            }}
            value={formik.values.expo_year}
            error={formik.errors.expo_year}
          />
        </View>
        <TextInput
          label="CVV/CVC"
          style={styles.inputCvc}
          onChangeText={(text) => {
            formik.setFieldValue("cvc", text);
          }}
          value={formik.values.cvc}
          error={formik.errors.cvc}
        />
      </View>

      <Button
        mode="contained"
        contentStyle={styles.btnContent}
        labelStyle={styles.btnText}
        onPress={formik.handleSubmit}
      >
        Pagar {totalPayment && `(${totalPayment.toFixed(3)} CLP)`}
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    number: "",
    expo_month: "",
    expo_year: "",
    cvc: "",
    name: "",
  };
}

function validationSchema() {
  return {
    number: Yup.number().min(16, true).max(16, true).required(true),
    expo_month: Yup.number().min(1, true).max(2, true).required(true),
    expo_year: Yup.number().min(2, true).max(2, true).required(true),
    cvc: Yup.number().min(3, true).max(3, true).required(true),
    name: Yup.string().min(4, true).required(true),
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 30,
    padding: 10,
  },
  containerTitle: {
    paddingBottom: 40,
    fontSize: 18,
    fontWeight: "bold",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  containerMonthYearInput: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  inputDate: {
    width: 100,
    marginRight: 10,
  },
  inputCvc: {
    width: "40%",
  },
  btnContent: {
    paddingVertical: 4,
    backgroundColor: colors.primary,
  },
  btnText: {
    fontSize: 16,
  },
});
