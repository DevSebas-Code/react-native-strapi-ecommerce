import React from "react";
import { StatusBar } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function StatusBarCustom(props) {
  const { backgroundColor, ...rest } = props;
  
  return (
    <>
      <StatusBar backgroundColor={backgroundColor} {...rest} />
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: backgroundColor,
        }}
      />
    </>
  );
}
