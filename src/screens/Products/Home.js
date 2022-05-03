import React from "react";
import { ScrollView } from "react-native";
import StatusBar from "../../components/StatusBar"
import Search from "../../components/Search"
import colors from "../../styles/colors"
import NewProducts from "../../components/Home/NewProducts"
import Banners from "../../components/Home/Banners";
export default function Favorites() {
  return (
    <>
    <StatusBar backgroundColor={colors.bgDark} barStyle="light-content"/>
    <Search />
    <ScrollView>
    <Banners />

      {/*New Products*/}
      <NewProducts />
    </ScrollView>
    </>
  );
}

