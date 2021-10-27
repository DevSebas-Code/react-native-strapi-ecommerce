import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { formStyle } from '../../styles'
import { useFormik } from "formik"
import { getMeApi, updateUserApi } from '../../api/user'
import useAuth from '../../hooks/useAuth'

import * as Yup from "yup"

export default function ChangeName() {
    const [loading, setLoading] = useState(false)
    const { auth } = useAuth()

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
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
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