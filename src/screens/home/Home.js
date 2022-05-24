import React, { useState, useContext, useEffect, Fragment } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors, device, gStyle } from "../../constants";
import { BlurView } from "expo-blur";
import { HomeContext } from "../../contexts";
import { getTrendingAlbums, getTrendingArtists } from "../../api";
import Loading from "../utils/Loading";

// components
import AlbumsHorizontal from "../../components/AlbumsHorizontal";
import ArtistsHorizontal from "../../components/ArtistsHorizontal";
import BigAlbumsHorizontal from "../../components/BigAlbumsHorizontal";

import recentlyPlayed from "../../mockdata/recentlyPlayed.json";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScreenContext } from "../../contexts";

const Home = ({ navigation }) => {
  const { showTabBarState, updateShowTabBarState } = useContext(ScreenContext);
  const {
    trendingAlbums,
    updateTrendingAlbums,
    trendingArtists,
    updateTrendingArtists,
  } = useContext(HomeContext);
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

        updateTrendingAlbums(response?.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (trendingArtists.length === 0) {
      try {
        const response = await getTrendingArtists();

        updateTrendingArtists(response?.data.data);
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

      <Animated.View style={[styles.containerHeader, { opacity: opacityOut }]}>
        <TouchableOpacity
          onPress={() => {
            updateShowTabBarState(false);

            navigation.navigate("ModalAccountOptions");
          }}
        >
          <FontAwesome color={colors.white} name="user-circle-o" size={28} />
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

        <BigAlbumsHorizontal data={trendingAlbums} heading="Top Collections" />

        {/* <AlbumsHorizontal
          data={recentlyPlayed}
          heading="Recently Played"
          tagline="The music you've had on repeat this month."
        /> */}

        <ArtistsHorizontal
          data={trendingArtists}
          heading="Top Artists"
          tagline="Top Artists around the world."
        />

        <BigAlbumsHorizontal data={trendingAlbums} heading="Made For You" />
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
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingTop: device.iPhoneNotch ? 60 : 36,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
  },
});

export default Home;
