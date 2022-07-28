import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { getProductApi } from "../../api/product"
import StatusBarCustom from '../../components/StatusBar'
import ScreenLoading from '../../components/ScreenLoading'
import Search from "../../components/Search"
import colors from '../../styles/colors'
import CarouselImages from '../../components/Product/CarouselImages'
import Price from '../../components/Product/Price'
import Quantity from '../../components/Product/Quantity'
import Buy from '../../components/Product/Buy'
import Favorite from '../../components/Product/Favorite'

export default function Product(props) {

    const { route } = props;
    const { params } = route;
    const [product, setProduct] = useState(null)
    const [images, setImages] = useState([])
    const [quantity, setQuantity] = useState(1)
   

    useEffect(() => {
        (async () => {
            setProduct(null);
            const response = await getProductApi(params.idProduct)
            setProduct(response)

            const arrayImages = [response.main_image]
            arrayImages.push(...response.images)
            setImages(arrayImages)
        })()
    }, [params])

    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark} barstyle="light-content" />
            <Search />
            {!product ? (
                <View style={styles.container}>
                    <ScreenLoading text="Cargando Producto" size="large" />
                </View>
            ) : (
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.title}>{product.title}</Text>
                    <CarouselImages images={images} />
                    <View style={styles.containerView}>
                        <Price price={product.price} discount={product.discount} />
                        <Quantity quantity={quantity} setQuantity={setQuantity} />
                        <Buy product={product} quantity={quantity} />
                        <Favorite product={product}/>

                    </View>
                </ScrollView>
            )}
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {

        paddingBottom: 50,

    },
    title: {

        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
        padding: 10
    },
    containerView: {
        padding: 10,
    }
})