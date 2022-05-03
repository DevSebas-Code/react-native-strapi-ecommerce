import React, { useState, useCallback, } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Search from "../../components/Search";
import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";
import { getMeApi } from "../../api/user";
import StatusBar from '../../components/StatusBar'
import ScreenLoading from "../../components/ScreenLoading";
import UserInfo from "../../components/Account/UserInfo";
import Menu from "../../components/Account/Menu";

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
      {!user ? (
        <View style={styles.container}>
          <ScreenLoading size="large" />
        </View>
      ) : (
        <>
          <Search />
          <ScrollView>

            <UserInfo user={user} />
            <Menu />
          </ScrollView>
        </>
      )}
    </>
  );
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
  loading: {
    marginBottom: 10
  },
  title: {
    fontSize: 18
  }
})
