import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getLastProductsApi } from "../../api/product"
import ListProducts from './ListProducts'

export default function NewProducts() {
    const [products, setProducts] = useState(null)
    
    useEffect(() => {
        (async () => {
            const response = await getLastProductsApi()
            // console.log(response)
            setProducts(response)
        })()
    }, [])


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nuevos Productos</Text>
            {products && <ListProducts products={products} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 20,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom : 10,
    }
})