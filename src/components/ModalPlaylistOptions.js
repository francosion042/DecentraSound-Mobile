/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  BackHandler,
} from "react-native";
import { device, gStyle, colors, fonts } from "../constants";
import { ScreenContext, UserContext } from "../contexts";
import {} from "../api";

// components
import LineItemCategory from "./LineItemCategory";

// mock data
import playlistOptions from "../mockdata/menuPlaylistOptions.json";

const ModalPlaylistOptions = ({ navigation }) => {
  const playlist = navigation.getParam("playlist");
  const { getUser } = useContext(UserContext);
  const { updateShowTabBarState } = useContext(ScreenContext);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack(null);
      updateShowTabBarState(true);
      return true;
    });

    return () => BackHandler.removeEventListener("hardwareBackPress", true);
  });

  const handleAction = async (action) => {
    const user = await getUser();
  };

  useEffect(async () => {
    const user = await getUser();
  }, []);

  return (
    <React.Fragment>
      <SafeAreaView style={styles.containerSafeArea}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
            updateShowTabBarState(true);
          }}
        >
          <View style={styles.containerButton}>
            <Text style={styles.buttonText}>Close</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={[gStyle.flex1, gStyle.pB80]}
        showsVerticalScrollIndicator={false}
        style={[gStyle.container, styles.transparent]}
      >
        <View style={styles.container}>
          <View style={styles.containerImage}>
            <Image source={{ uri: playlist.imageUrl }} style={styles.image} />
          </View>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
            {playlist.name}
          </Text>
        </View>

        {Object.keys(playlistOptions).map((index) => {
          const item = playlistOptions[index];

          return (
            <LineItemCategory
              key={item.id}
              disableRightSide
              icon={item.icon}
              iconLibrary={item.lib}
              onPress={() => handleAction(item.action)}
              title={item.title}
            />
          );
        })}
      </ScrollView>
    </React.Fragment>
  );
};

ModalPlaylistOptions.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  containerSafeArea: {
    ...gStyle.containerAbsolute,
    backgroundColor: colors.blackBlur,
  },
  containerButton: {
    ...gStyle.flexCenter,
    ...gStyle.spacer6,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
  },
  transparent: {
    backgroundColor: colors.black80,
  },
  container: {
    alignItems: "center",
    paddingTop: device.iPhoneNotch ? 94 : 50,
  },
  containerImage: {
    shadowColor: colors.black,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  image: {
    height: 148,
    marginBottom: 16,
    width: 148,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 20,
    marginBottom: 8,
    paddingHorizontal: 24,
    textAlign: "center",
  },
  playlistInfo: {
    color: colors.greyInactive,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginBottom: 48,
  },
});

export default ModalPlaylistOptions;
