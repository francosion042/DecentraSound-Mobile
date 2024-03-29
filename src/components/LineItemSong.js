import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors, gStyle } from "../constants";
import { ScreenContext } from "../contexts";

const LineItemSong = ({ active, downloaded, onPress, songData, screen }) => {
  const { toggleSongOptionsModalVisible, updateClickedSong } =
    useContext(ScreenContext);
  const activeColor = active ? colors.brandPrimary : colors.white;

  return (
    <View style={styles.container}>
      <Image
        source={
          songData.imageUrl
            ? { uri: songData.imageUrl }
            : require("../../assets/icon.png")
        }
        style={styles.image}
      />
      <TouchableOpacity
        activeOpacity={gStyle.activeOpacity}
        onPress={() => onPress(songData)}
        style={{ ...gStyle.flex5 }}
      >
        <Text style={[styles.title, { color: activeColor }]} numberOfLines={1}>
          {songData.title}
        </Text>
        <View style={gStyle.flexRow}>
          {downloaded && (
            <View style={styles.circleDownloaded}>
              <Ionicons color={colors.blackBg} name="arrow-down" size={14} />
            </View>
          )}
          <Text style={styles.artist}>
            {songData.artist ? songData.artist.name : "Unknown Artist"}
          </Text>
        </View>
      </TouchableOpacity>

      {screen !== "artist" && screen !== "mySongs" ? (
        <View style={styles.containerRight}>
          <TouchableOpacity
            style={styles.optionIcon}
            onPress={() => {
              updateClickedSong(songData);
              toggleSongOptionsModalVisible();
            }}
          >
            <Feather
              color={colors.brandPrimary}
              name="more-vertical"
              size={20}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

LineItemSong.defaultProps = {
  active: false,
  downloaded: false,
};

LineItemSong.propTypes = {
  // required
  onPress: PropTypes.func.isRequired,

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
  optionIcon: {
    width: "70%",
    alignItems: "flex-end",
  },
  itemStyle: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
});

export default LineItemSong;
