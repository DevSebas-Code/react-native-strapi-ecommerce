import React, { useState, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button } from "react-native-paper"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { formStyle } from '../../styles'
import { getMeApi, updateUserApi } from "../../api/user"
import { useFormik } from "formik"
import * as Yup from "yup"
import useAuth from '../../hooks/useAuth'
import Toast from 'react-native-root-toast'
import {RootSiblingParent} from 'react-native-root-siblings'


export default function ChangeUsername() {
    const { auth } = useAuth()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(
            () => {
                (async () => {
                    const response = await getMeApi(auth.token)
                    await formik.setFieldValue("username", response.username)
                })()
            },
            [],
        )
    )


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (FormData) => {
            setLoading(true)
            try {
                const response = await updateUserApi(auth, FormData)
                if (response.statusCode) throw "El nombre de usuario ya existe";
                navigation.goBack()
            } catch (error) {
                Toast.show(error,{
                    position: Toast.positions.CENTER
                })
                formik.setFieldError("username",true)
                setLoading(false)
            }
        }
    })


    const styles = StyleSheet.create({
        content: {
            padding: 20,
        }
    })


    function initialValues() {
        return {
            username: ""
        }
    }

    function validationSchema() {
        return {
            username: Yup.string().required(true)
        }
    }


    return (
        <View style={styles.content}>
            <RootSiblingParent>
            <TextInput label="Nombre de usuario"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("username", text)}
                value={formik.values.username}
                error={formik.errors.username} />
            <Button mode="contained"
                style={formStyle.btnSucces}
                onPress={formik.handleSubmit}
                loading={loading}>
                Cambiar nombre de usuario
            </Button>
            </RootSiblingParent>
        </View>
    )
}
