import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useEffect } from "react";
import { map } from "lodash";
import ScreenLoading from "../../components/ScreenLoading";
import colors from "../../styles/colors";

export default function AddressList({
  addresses,
  selectedAddress,
  setSelectedAddress,
}) {
  useEffect(() => {
    addresses && setSelectedAddress(addresses[0]);
  }, [addresses]);

  // console.log("selectedAddress: ", selectedAddress);
  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>
        Selecciona la dirección de envío
      </Text>
      {!addresses && (
        <View style={styles.loaderContainer}>
          <ScreenLoading text="Cargando Direcciones" />
        </View>
      )}
      {map(addresses, (address) => (
        <TouchableWithoutFeedback
          key={address._id}
          onPress={() => setSelectedAddress(address)}
        >
          <View
            style={[
              styles.address,
              address._id === selectedAddress?._id && styles.checked,
            ]}
          >
            <Text style={styles.title}>{address.title}</Text>
            <Text>{address.name_lastname}</Text>
            <Text>{address.address}</Text>
            <View style={styles.blockLine}>
              <Text>{address.state}, </Text>
              <Text>{address.city}, </Text>
              <Text>{address.postal_code}</Text>
            </View>
            <Text>{address.country}</Text>
            <Text>Numero de Teléfono: {address.phone}</Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  containerTitle: {
    padding: 10,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  blockLine: {
    flexDirection: "row",
  },
  loaderContainer: {
    position: "relative",
    left: 0,
    right: 0,
    top: 3,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    borderColor: colors.primary,
    backgroundColor: "#0098d330",
  },
});
