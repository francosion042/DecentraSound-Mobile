import React, { useState, useContext, useEffect, Fragment } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors, device, func, gStyle } from "../../constants";
import { BlurView } from "expo-blur";
import { ExploreContext } from "../../contexts";
import { getTrendingAlbums, getTrendingArtists } from "../../api";
import Loading from "../../components/Loading";

// components
import ArtistsHorizontal from "../../components/ArtistsHorizontal";
import BigAlbumsHorizontal from "../../components/BigAlbumsHorizontal";
import DoubleRowAlbumsHorizontal from "../../components/DoubleRowAlbumsHorizontal";
import ArticlesBannerHorizontal from "../../components/ArticlesBannerHorizontal";

import { TouchableOpacity } from "react-native-gesture-handler";
import { ScreenContext } from "../../contexts";
import ModalFilterOptions from "../../components/ModalFilterOptions";

const Explore = ({ navigation }) => {
  const { showTabBarState } = useContext(ScreenContext);
  const {
    trendingAlbums,
    updateTrendingAlbums,
    trendingArtists,
    updateTrendingArtists,
    filterOptionsModalVisible,
    togglefilterOptionsModalVisible,
  } = useContext(ExploreContext);
  const [scrollY] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(true);

  const opacityIn = scrollY.interpolate({
    inputRange: [0, 128],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const opacityOut = scrollY.interpolate({
    inputRange: [0, 88],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const handleTrending = async () => {
    if (trendingAlbums.length === 0) {
      try {
        const response = await getTrendingAlbums();

        if (response && response.data) {
          updateTrendingAlbums(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (trendingArtists.length === 0) {
      try {
        const response = await getTrendingArtists();

        if (response && response.data) {
          updateTrendingArtists(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleTrending();
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Fragment>
      {device.iPhoneNotch && (
        <Animated.View style={[styles.iPhoneNotch, { opacity: opacityIn }]} />
      )}

      {showTabBarState ? (
        <BlurView intensity={99} style={styles.blurview} tint="dark" />
      ) : null}

      {filterOptionsModalVisible && <ModalFilterOptions />}

      <Animated.View style={[styles.containerHeader, { opacity: opacityOut }]}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Explore</Text>
        </View>
        <TouchableOpacity
          style={styles.btnFilter}
          onPress={() => {
            togglefilterOptionsModalVisible();
          }}
        >
          <FontAwesome name="filter" color={colors.brandPrimary} size={20} />
          <Text style={styles.btnFilterText}>Filter</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={gStyle.container}
      >
        <View style={gStyle.spacer16} />

        <ArticlesBannerHorizontal
          data={func.extractTrendingAlbum(trendingAlbums)}
          heading="Top Collections"
        />

        <View style={gStyle.liner} />

        <DoubleRowAlbumsHorizontal
          data={func.extractTrendingAlbum(trendingAlbums)}
          heading="Top Collections"
        />

        <ArtistsHorizontal
          data={func.extractTrendingArtists(trendingArtists)}
          heading="Top Artists"
          tagline="Top Artists around the world."
        />

        <BigAlbumsHorizontal
          data={func.extractTrendingAlbum(trendingAlbums)}
          heading="Made For You"
        />
      </Animated.ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  iPhoneNotch: {
    backgroundColor: colors.black70,
    height: 44,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 20,
  },
  containerHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: device.iPhoneNotch ? 75 : 30,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
  },
  headerTextContainer: {
    // width: "80%",
  },
  headerText: {
    ...gStyle.textBold40,
    color: colors.white,
  },
  btnFilter: {
    ...gStyle.pH2,
    flexDirection: "row",
    backgroundColor: colors.grey3,
    paddingVertical: 5,
    borderRadius: 5,
  },
  btnFilterText: {
    ...gStyle.mL1,
    color: colors.white,
  },
});

export default Explore;
