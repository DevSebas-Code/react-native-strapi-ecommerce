import React, { useState, useCallback } from "react";
import { ScrollView, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Search from "../../components/Search";
import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";
import { getMeApi } from "../../api/user";
import StatusBar from '../../components/StatusBar'
import ScreenLoading from "../../components/ScreenLoading";

export default function Account() {
  const [user, setUser] = useState(null);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        setUser(response);
      })();
    }, [])
  );



  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />

      <ScreenLoading size="large" />
      <Search />
      <ScrollView>
        <Text>Estamos en mi cuenta</Text>
      </ScrollView>


    </>
  );
}
