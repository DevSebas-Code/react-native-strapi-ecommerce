import { StyleSheet } from "react-native";
import colors from "./colors";

const formStyles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  btnSucces: {
    padding: 6,
    backgroundColor: colors.primary,
  },
  btnText: {
    marginTop: 10,

  },
  btnTextLabel: {
    color: colors.fontLight,
  },
});

export default formStyles;
