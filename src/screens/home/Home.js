/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, Fragment } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors, device, gStyle, func } from "../../constants";
import { BlurView } from "expo-blur";
import { HomeContext } from "../../contexts";
import { getTrendingAlbums, getTrendingArtists } from "../../api";
import Loading from "../../components/Loading";

// components
// import AlbumsHorizontal from "../../components/AlbumsHorizontal";
import ArtistsHorizontal from "../../components/ArtistsHorizontal";
import BigAlbumsHorizontal from "../../components/BigAlbumsHorizontal";
import AlbumsHorizontal from "../../components/AlbumsHorizontal";

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
    try {
      const response = await getTrendingAlbums();

      if (response && response.data) {
        updateTrendingAlbums(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await getTrendingArtists();

      if (response && response.data) {
        updateTrendingArtists(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleTrending();
  }, []);

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
          <FontAwesome
            color={colors.brandPrimary}
            name="user-circle-o"
            size={28}
          />
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

        <BigAlbumsHorizontal
          data={func.extractTrendingAlbum(trendingAlbums)}
          heading="Top Collections"
        />

        <AlbumsHorizontal
          data={func.extractTrendingAlbum(trendingAlbums)}
          heading="Made For You"
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
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingTop: device.iPhoneNotch ? 75 : 36,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
  },
});

export default Home;
