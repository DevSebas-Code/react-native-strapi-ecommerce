import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Carousel, {Pagination} from "react-native-snap-carousel";
import { size } from "lodash";
import { API_URL } from "../../utils/constants";
import React, { useState, useEffect } from "react";
import { getBannersApi } from "../../api/home-banner";

const width = Dimensions.get("window").width;
const height = 160;

export default function Banners() {
  const [banners, setBanners] = useState(null);
  const [bannerActive, setBannerActive] = useState(0)

  useEffect(() => {
    (async () => {
      const response = await getBannersApi();
      setBanners(response);
    })();
  }, []);

  if (!banners) return null;

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => console.log("ir al producto")}>
        <Image
          style={styles.carousel}
          source={{ uri: `${API_URL}${item.banner[0].url}` }}
        />
      </TouchableWithoutFeedback>
    );
  };
  return (
    <View style={styles.container}>
      <Carousel
        layout={"default"}
        data={banners}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setBannerActive(index) }
      />
      <Pagination
      dotsLength={size(banners)}
      activeDotIndex={bannerActive}
      inactiveDotOpacity={0.6}
      inactiveDotScale={0.6}
      containerStyle={styles.dotsContainer}
      dotStyle={styles.dot}
      inactiveDotStyle={styles.dot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  carousel: {
    width: width,
    height: height,
  },
  dotsContainer: {
    position: "absolute",
    bottom: -20,
    width: "100%",
  },
  dot: {
    backgroundColor: '#fff'
  }
});
