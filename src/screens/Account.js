import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import Search from "../components/Search";

export default function Account() {
  return (
    <>
      <Search />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text>Estamos en Mi cuenta</Text>
      </ScrollView>
    </>
  );
}
