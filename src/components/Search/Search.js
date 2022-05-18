import React, { useState, useEffect } from "react";
import { StyleSheet, View, Keyboard, Animated } from "react-native";
import { Searchbar } from "react-native-paper";
import colors from "../../styles/colors";
import {
  AnimatedIcon,
  inputAnimationWidth,
  inputAnimation,
  animatedTransition,
  animatedTransitionReset,
} from "./SearchAnimation";

export default function Search() {
  const openSearch = () => {
    animatedTransition.start();
  };

  const closeSearch = () => {
    animatedTransitionReset.start();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <AnimatedIcon
          name="arrow-left"
          size={20}
          style={styles.backArrow}
          onPress={closeSearch}
        />
        <Animated.View style={[inputAnimation, { width: inputAnimationWidth }]}>
          <Searchbar placeholder="Busca tu producto" onFocus={openSearch} />
        </Animated.View>
      </View>
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
    left: 0,
    color: colors.fontLight,
  },
});
