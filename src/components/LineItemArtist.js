import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { colors, gStyle } from "../constants";

const LineItemArtist = ({ onPress, artist }) => {
  return (
    <View style={styles.container}>
      <Image
        source={
          artist.imageUrl
            ? { uri: artist.imageUrl }
            : require("../../assets/icon.png")
        }
        style={styles.image}
      />
      <TouchableOpacity
        activeOpacity={gStyle.activeOpacity}
        onPress={() => onPress()}
        style={{ ...gStyle.flex5 }}
      >
        <Text style={[styles.title]} numberOfLines={1}>
          {artist.name}
        </Text>
        <View style={gStyle.flexRow}>
          <Text style={styles.artist}>Artist</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

LineItemArtist.defaultProps = {
  active: false,
  downloaded: false,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    width: "100%",
    borderBottomColor: colors.grey3,
    borderBottomWidth: 1,
  },
  title: {
    ...gStyle.text16,
    color: colors.white,
    marginBottom: 4,
  },
  artist: {
    ...gStyle.text10,
    color: colors.greyInactive,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  containerRight: {
    alignItems: "flex-end",
    flex: 1,
  },
  itemStyle: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
});

export default LineItemArtist;
