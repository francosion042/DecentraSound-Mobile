import * as React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, gStyle } from "../constants";
import { View } from "react-native-animatable";

const PlaylistItem = ({ bgColor, onPress, title }) => (
  <TouchableOpacity
    activeOpacity={gStyle.activeOpacity}
    onPress={onPress}
    style={[styles.playlistItem, { backgroundColor: bgColor }]}
  >
    <View
      style={[styles.playlistItemCover, { backgroundColor: colors.black40 }]}
    >
      <Text style={styles.playlistTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

PlaylistItem.propTypes = {
  // required
  bgColor: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  playlistItem: {
    borderRadius: 6,
    flex: 1,
    height: 98,
    marginBottom: 24,
    marginRight: 24,
  },
  playlistItemCover: {
    borderRadius: 6,
    flex: 1,
    height: 98,
    paddingLeft: 12,
    paddingTop: 12,
  },
  playlistTitle: {
    ...gStyle.textBold22,
    color: colors.white,
  },
});

export default PlaylistItem;
