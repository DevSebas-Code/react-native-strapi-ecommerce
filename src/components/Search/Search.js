import React, { useState, useEffect } from "react";
import { StyleSheet, View, Keyboard, Animated } from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../styles/colors";
import {
  AnimatedIcon,
  inputAnimationWidth,
  inputAnimation,
  animatedTransition,
  animatedTransitionReset,
  arrowAnimation,
} from "./SearchAnimation";
import { updateSearchHistoryApi } from "../../api/search";
import SearchHistory from "./SearchHistory";

export default function Search({ currentSearch }) {
  const [searchQuery, setSearchQuery] = useState(currentSearch || "");
  const [showHistory, setShowHistory] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const onChangeSearch = (query) => setSearchQuery(query);

  const openSearch = () => {
    animatedTransition.start();
    setShowHistory(!showHistory);
  };

  const closeSearch = () => {
    animatedTransitionReset.start();
    Keyboard.dismiss();
    setShowHistory(!showHistory);
  };

  const onSearch = async (reuseSearch) => {
    //Checks if the value is a string
    const isReuse = typeof reuseSearch === "string";
    closeSearch();
    // if Reuse is not a string, it means that there's a new search, so the history updates
    !isReuse && (await updateSearchHistoryApi(searchQuery));

    route.name === "search"
      ? navigation.push("search", {
          search: isReuse ? reuseSearch : searchQuery,
        })
      : navigation.navigate("search", {
          search: isReuse ? reuseSearch : searchQuery,
        });
  };

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      <View style={styles.containerInput}>
        <AnimatedIcon
          name="arrow-left"
          size={20}
          style={[styles.backArrow, arrowAnimation]}
          onPress={closeSearch}
        />
        <Animated.View style={[inputAnimation, { width: inputAnimationWidth }]}>
          <Searchbar
            placeholder="Busca tu producto"
            value={searchQuery}
            onFocus={openSearch}
            onChangeText={onChangeSearch}
            onSubmitEditing={onSearch}
            style={{ borderRadius: 50 }}
          />
        </Animated.View>
      </View>
      <SearchHistory
        showHistory={showHistory}
        containerHeight={containerHeight}
        onSearch={onSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgDark,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  containerInput: {
    position: "relative",
    alignItems: "flex-end",
  },
  backArrow: {
    position: "absolute",
    top: 10,
    left: -4,
    right: 0,
    color: colors.fontLight,
  },
});
