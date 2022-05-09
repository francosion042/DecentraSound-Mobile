import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { withNavigation } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
import { colors, device, gStyle } from "../constants";

class BarMusicPlayer extends Component {
  constructor() {
    super();

    this.state = {
      favorited: false,
      paused: true,
    };

    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  toggleFavorite() {
    this.setState((prev) => ({
      favorited: !prev.favorited,
    }));
  }

  togglePlay() {
    this.setState((prev) => ({
      paused: !prev.paused,
    }));
  }

  render() {
    const { navigation, song } = this.props;
    const { favorited, paused } = this.state;

    const favoriteColor = favorited ? colors.brandPrimary : colors.greyInactive;
    const favoriteIcon = favorited ? "heart" : "heart-o";
    const iconPlay = paused ? "play" : "pause";

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate("ModalMusicPlayer")}
        style={styles.container}
      >
        <TouchableOpacity
          activeOpacity={gStyle.activeOpacity}
          hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
          onPress={this.toggleFavorite}
          style={styles.containerIconLeft}
        >
          <FontAwesome color={favoriteColor} name={favoriteIcon} size={20} />
        </TouchableOpacity>
        {song && (
          <View>
            <View style={styles.containerSong}>
              <Text style={styles.title}>{`${song.title}`}</Text>
            </View>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={gStyle.activeOpacity}
          hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
          onPress={this.togglePlay}
        >
          <FontAwesome color={colors.white} name={iconPlay} size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={gStyle.activeOpacity}
          hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
          style={styles.containerIconRight}
        >
          <FontAwesome color={colors.white} name="step-forward" size={28} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

BarMusicPlayer.defaultProps = {
  song: null,
};

BarMusicPlayer.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,

  // optional
  song: PropTypes.shape({
    artist: PropTypes.string,
    title: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: colors.grey,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    width: "100%",
  },
  containerIconLeft: {
    ...gStyle.flexCenter,
    width: 50,
  },
  containerIconRight: {
    ...gStyle.flexCenter,
    width: 50,
  },
  containerSong: {
    overflow: "hidden",
    width: device.width - 130,
  },
  title: {
    ...gStyle.text18,
    color: colors.white,
  },
  artist: {
    ...gStyle.text12,
    color: colors.greyLight,
  },
  device: {
    ...gStyle.text10,
    color: colors.brandPrimary,
    marginLeft: 4,
    textTransform: "uppercase",
  },
});

export default withNavigation(BarMusicPlayer);
