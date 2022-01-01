import React from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { map } from 'lodash'
import colors from '../../styles/colors'
import { deleteAddressApi } from '../../api/address'
import useAuth from '../../hooks/useAuth'

export default function AddressList(props) {
    const { auth } = useAuth()
    const navigation = useNavigation()
    const { addresses, setReloadAddress } = props;
    
    const deleteAddresAlert = (address) => {
        Alert.alert(
            "Eliminando Direccion",
            `¿Estas segura de que quieres eliminar la direccion ${address.title}?`,
            [
                {
                    text: "NO"
                },
                {
                    text: "SI",
                    onPress: () => deleteAddress(address._id)
                },
            ],
            { cancelable: false }
        )
    }
    const deleteAddress = async (idAddress) => {
        try {
            await deleteAddressApi(auth, idAddress)
            setReloadAddress(true)
        } catch (error) {
            console.log(error)
        }
    }

    const goToUpdateAddress = (idAddress) => {
        // The values can be passed to the function navigation.navigate(), you can pass a string || boolean || number etc.
        // but you can't pass objects or functions, it will throw an error.
        navigation.navigate("add-address", {idAddress})
    }
    return (
        <View style={styles.container}>
            {map(addresses, (address) => (
                <View key={address._id} style={styles.address}>
                    <Text style={styles.title}>{address.title}</Text>
                    <Text>{address.name_lastname}</Text>
                    <Text>{address.address}</Text>
                    <View style={styles.blockLine}>
                        <Text>{address.state}, </Text>
                        <Text>{address.city}, </Text>
                        <Text>{address.postal_code}</Text>
                    </View>
                    <Text>{address.country}</Text>
                    <Text>Numero de telefono: {address.phone}</Text>
                    <View style={styles.actions}>
                        <Button mode="contained" 
                        color={colors.primary}
                        onPress={() => goToUpdateAddress(address._id)}>
                            Editar
                        </Button>
                        <Button mode="contained"
                            color={colors.danger}
                            onPress={() => deleteAddresAlert(address)}>
                            Eliminar
                        </Button>
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    address: {
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15
    },
    title: {
        fontWeight: "bold",
        paddingBottom: 5
    },
    blockLine: {
        flexDirection: "row"
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30
    }
})