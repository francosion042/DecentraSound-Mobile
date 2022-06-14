/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, Fragment } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
import { colors, device, func, gStyle } from "../../constants";
import { BlurView } from "expo-blur";
import { ExploreContext } from "../../contexts";
import {
  getArtists,
  getSpecialAlbums,
  getLatestAlbums,
  getSpecialAlbumsByGenre,
  getAlbumsByBlockchain,
} from "../../api";
import Loading from "../../components/Loading";

// components
import ArtistsHorizontal from "../../components/ArtistsHorizontal";
import BigAlbumsHorizontal from "../../components/BigAlbumsHorizontal";
import DoubleRowAlbumsHorizontal from "../../components/DoubleRowAlbumsHorizontal";
import AlbumsBannerHorizontal from "../../components/AlbumsBannerHorizontal";

import { TouchableOpacity } from "react-native-gesture-handler";
import { ScreenContext } from "../../contexts";
import ModalFilterOptions from "../../components/ModalFilterOptions";

const Explore = ({ navigation }) => {
  const { showTabBarState } = useContext(ScreenContext);
  const {
    artists,
    updateArtists,
    specialAlbums,
    updateSpecialAlbums,
    specialAlbumsByGenre,
    updateSpecialAlbumsByGenres,
    latestAlbums,
    updateLatestAlbums,
    albumsByBlockchain,
    updateAlbumsByBlockchain,
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

  const handleData = async () => {
    // Get Special Albums
    try {
      const response = await getSpecialAlbums();

      if (response && response.data) {
        updateSpecialAlbums(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }

    // Get Special ALbums by Genre
    try {
      const response = await getSpecialAlbumsByGenre();

      if (response && response.data) {
        updateSpecialAlbumsByGenres(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }

    // Get ALbums By Blockchain
    try {
      const response = await getAlbumsByBlockchain("ETHEREUM");

      if (response && response.data) {
        updateAlbumsByBlockchain(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }

    // Get Latest ALbums
    try {
      const response = await getLatestAlbums();

      if (response && response.data) {
        updateLatestAlbums(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }

    // Get Top Artists
    try {
      const response = await getArtists();

      if (response && response.data) {
        updateArtists(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Fragment>
      {device.iPhoneNotch && (
        <Animated.View style={[styles.iPhoneNotch, { opacity: opacityIn }]} />
      )}

      <NavigationEvents
        onWillFocus={() => {
          // Do your things here
          handleData();
        }}
      />

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

        <AlbumsBannerHorizontal data={specialAlbums} />

        <View style={gStyle.liner} />

        <DoubleRowAlbumsHorizontal
          data={latestAlbums}
          heading="Latest Collections"
        />

        <ArtistsHorizontal
          data={func.extractTrendingArtists(artists)}
          heading="Top Artists"
          tagline="Top Artists around the world."
        />

        <BigAlbumsHorizontal data={latestAlbums} heading="Made For You" />
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
