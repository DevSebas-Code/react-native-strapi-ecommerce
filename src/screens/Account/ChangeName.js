import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { formStyle } from '../../styles'
import { useFormik } from "formik"
import { getMeApi, updateUserApi } from '../../api/user'
import useAuth from '../../hooks/useAuth'
import * as Yup from "yup"
import Toast from "react-native-root-toast"
import { RootSiblingParent } from "react-native-root-siblings";

export default function ChangeName() {
    const [loading, setLoading] = useState(false)
    const { auth } = useAuth()
    const navigation = useNavigation()
    // Cada vez que accedamos a la Screen Changename realizamos una peticion a la BD para chequear la ultima información

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                if (response.name && response.lastname) {
                    await formik.setFieldValue("name", response.name);
                    await formik.setFieldValue("lastname", response.lastname);
                }
            })()
        }, [])
    )

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                await updateUserApi(auth, formData);
                navigation.goBack()
                console.log("OK");
            } catch (error) {
                console.log("ERROR");
                Toast.show("Error al actualizar los datos",{
                    position: Toast.positions.CENTER,
                })
                console.log(error)
                setLoading(false);
            }
        }
    })
    return (
        <View style={styles.container}>
            <TextInput
                label="Nombre"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("name", text)}
                value={formik.values.name}
                error={formik.errors.name}
            />
            <TextInput
                label="Apellido"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("lastname", text)}
                value={formik.values.lastname}
                error={formik.errors.lastname}
            />
            
            <Button
                mode="contained"
                style={formStyle.btnSucces}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Cambiar nombre y apellidos
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
        name: "",
        lastname: "",
    }
}

function validationSchema() {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),
    }
}