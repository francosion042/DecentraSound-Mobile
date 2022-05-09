import React, { useState, Fragment } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors, device, gStyle } from "../../constants";
import { BlurView } from "expo-blur";

// components
import AlbumsHorizontal from "../../components/AlbumsHorizontal";
import BigAlbumsHorizontal from "../../components/BigAlbumsHorizontal";

// mock data
import heavyRotation from "../../mockdata/heavyRotation.json";
import jumpBackIn from "../../mockdata/jumpBackIn.json";
import recentlyPlayed from "../../mockdata/recentlyPlayed.json";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = ({ navigation, screenProps }) => {
  const [scrollY] = useState(new Animated.Value(0));
  const { toggleTabBarState, setToggleTabBar } = screenProps;

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

  return (
    <Fragment>
      {device.iPhoneNotch && (
        <Animated.View style={[styles.iPhoneNotch, { opacity: opacityIn }]} />
      )}

      {toggleTabBarState ? (
        <BlurView intensity={99} style={styles.blurview} tint="dark" />
      ) : null}

      <Animated.View style={[styles.containerHeader, { opacity: opacityOut }]}>
        <TouchableOpacity
          onPress={() => {
            setToggleTabBar();

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

        <BigAlbumsHorizontal data={recentlyPlayed} heading="Top Collections" />

        <AlbumsHorizontal
          data={recentlyPlayed}
          heading="Recently Played"
          tagline="The music you've had on repeat this month."
        />

        <AlbumsHorizontal
          data={jumpBackIn}
          heading="Jump back in"
          tagline="Your top listens from the past few months."
        />

        <BigAlbumsHorizontal data={heavyRotation} heading="Made For You" />
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
