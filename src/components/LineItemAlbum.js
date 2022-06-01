import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { colors, gStyle } from "../constants";

const LineItemAlbum = ({ onPress, album }) => {
  return (
    <View style={styles.container}>
      <Image
        source={
          album.coverImageUrl
            ? { uri: album.coverImageUrl }
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
          {album.name}
        </Text>
        <View style={gStyle.flexRow}>
          <Text style={styles.artist}>Album - {album.artist.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

LineItemAlbum.defaultProps = {
  active: false,
  downloaded: false,
};

LineItemAlbum.propTypes = {
  // required
  onPress: PropTypes.func.isRequired,
  songData: PropTypes.shape({
    songId: PropTypes.number.isRequired,
    contractAddress: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,

  // optional
  active: PropTypes.bool,
  downloaded: PropTypes.bool,
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
  circleDownloaded: {
    alignItems: "center",
    backgroundColor: colors.brandPrimary,
    borderRadius: 7,
    height: 14,
    justifyContent: "center",
    marginRight: 8,
    width: 14,
  },
  artist: {
    ...gStyle.text10,
    color: colors.greyInactive,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 5,
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

export default LineItemAlbum;
