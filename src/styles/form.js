import { StyleSheet } from "react-native";
import colors from "./colors";

const formStyles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
  },
  btnSucces: {
    padding: 5,
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
