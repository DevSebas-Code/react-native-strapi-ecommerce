import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function Quantity(props) {
  const { quantity, setQuantity } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
  ]);

  return (
    // <View style={{zIndex: 2}}>
      <DropDownPicker
        listMode="SCROLLVIEW"
        defaultValue={quantity}
        open={open}
        items={items} 
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        containerStyle={styles.containerStyle}
        itemStyle={styles.itemStyle}
        dropDownStyle={styles.dropDownPicker}
        style={styles.dropDownPicker}
        labelStyle={styles.labelStyle}
        
        onChangeValue={(value) => {
          setQuantity(value);
        }}
      />
    // </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    width: 110,
    marginTop: 15,
    marginBottom: 15
  },
  itemStyle: {
    justifyContent: "flex-start",
  },
  dropDownStyle: {
    backgroundColor: "#fafafa",
  },
  dropDownPicker: {
    backgroundColor: "#fafafa",
    zIndex: 2
  },
  labelStyle: {
    color: "#000",
  },
});
