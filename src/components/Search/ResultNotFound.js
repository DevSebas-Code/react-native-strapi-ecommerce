import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ResultNotFound({search}) {
  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>No hay resultados para {search}</Text>
      <Text style={styles.oherText}>Revisa la ortografía o usa terminos más generales.</Text>
    </View>
  )
}

const styles= StyleSheet.create({
    container: {
        padding: 20
    },
    searchText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    oherText: {
        fontSize: 14,
        paddingTop: 5
    }
})