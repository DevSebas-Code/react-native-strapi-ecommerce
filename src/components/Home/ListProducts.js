import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { API_URL } from "../../utils/constants"
import { useNavigation } from '@react-navigation/native'
import { map } from 'lodash'
import { shadow } from 'react-native-paper'

export default function ListProducts(props) {

    const { products } = props
    const navigation = useNavigation()

    const goToProduct = (id) => {
        // We're using navigation.push(). to always overlap a new stack on top of each other with the new Product Id
        navigation.push("product", { idProduct : id })
    }

    return (
        <View style={styles.container}>
            {map(products, (product) => (
                <TouchableWithoutFeedback
                    key={product._id}
                    onPress={() => goToProduct(product._id)}
                >
                    <View style={[styles.containerProduct, styles.shadowProp]}>
                        <View style={styles.product}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: `${API_URL}${product.main_image.url}`
                                }}
                            />
                            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                                {product.title}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        margin: 5,
      
    },
    containerProduct: {
        width: "50%",
        padding: 3,
        marginTop: 10,
    },
    product: {
        backgroundColor: "rgba(40, 40, 40, 0.8)",
        padding: 10,
        borderRadius: 28,
    },
    image: {
        height: 150,
        resizeMode: "contain",
        borderRadius: 50
    },
    name: {
        marginTop: 15,
        fontSize: 17,
        color: '#fff'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }
})