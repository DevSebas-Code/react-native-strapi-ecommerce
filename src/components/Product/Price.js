import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Price(props) {

    const { price, discount } = props

    const calcPrice = (price, discount) => {
        if (!discount) return price
        const discountAmount = (price * discount) / 100
        return (price - discountAmount).toFixed(2).concat(0)
    }
    return (
        <View>
            {discount && (
                <View style={styles.containerData}>
                    <Text style={styles.dataText}>Precio Normal:</Text>
                    <Text style={[styles.dataValue, styles.oldPrice]}>{price} CLP </Text>
                </View>
            )}

            <View style={styles.containerData}>
                <Text style={styles.dataText}>Precio:</Text>
                <Text style={[styles.dataValue, styles.currentPrice]}>
                    {calcPrice(price, discount) + " CLP"}
                </Text>
            </View>

            {discount && (
                <View style={styles.containerData}>
                    <Text style={styles.dataText}>Ahorras:</Text>
                    <Text style={[styles.dataValue, styles.saving]}>
                        {((price * discount) / 100).toFixed(2).concat(0) + " CLP"} ({discount}%)
                    </Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    containerData: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5
    },
    dataText: {
        width: "45%",
        fontSize: 18,
        color: "#747474",
        textAlign: "right"
    },
    dataValue: {
        width: "55%",
        fontSize: 18,
        paddingLeft: 5,
    },
    oldPrice: {
        textDecorationLine: "line-through",
    },
    currentPrice: {
        fontSize: 23,
        color: "#bc0e0d"
    },
    saving: {
        color: "#bc0e0d"
    }
})