import React, { useState, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import useAuth from '../../hooks/useAuth'
import { useFormik } from "formik"
import { TextInput, Button } from "react-native-paper"
import { formStyle } from '../../styles'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-root-toast'
import { updateUserApi } from '../../api/user'
import formStyles from '../../styles/form'
import * as Yup from "yup"

export default function ChangePassword() {
    const { auth } = useAuth()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (FormData) => {
            setLoading(true)
            try {
                const response = await updateUserApi(auth, FormData)
                if(response.statusCode) throw "Error al cambiar la contraseña"
                navigation.goBack()
            } catch (error) {
                Toast.show(error,{
                    position: Toast.positions.CENTER
                })
                setLoading(false)
            }
        }
    })

    return (
        <View style={styles.container}>
            <TextInput label="Nueva contraseña"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
                secureTextEntry
            />
            <TextInput label="Repetir nueva contraseña"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
                secureTextEntry
            />
            <Button mode="contained"
                style={formStyles.btnSucces}
                onPress={formik.handleSubmit}
                loading={loading}>
                
                Cambiar Contraseña
            </Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})

function initialValues() {
    return {
        password: "",
        repeatPassword: ""
    }
}

function validationSchema() {
    return {
        password: Yup.string().min(4, true).required(true),
        repeatPassword: Yup.string().
        min(4, true).
        //en dicho array se le indica como referencia
        // el campo password, luego se añade un true
        // el cual indica si efectivamente la password es la misma tanto en en el campo repeatPassword como el campo password
        // oneOF espera un array recibe como parametro
        oneOf([Yup.ref("password")], true).
            required(true)
    }
}