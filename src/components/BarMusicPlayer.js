import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
import TrackPlayer, {
  usePlaybackState,
  State,
} from "react-native-track-player";
import * as Animatable from "react-native-animatable";
import { colors, device, gStyle } from "../constants";
import { PlayingContext } from "../contexts";

// custom component
const AnimatedFontAwesome = Animatable.createAnimatableComponent(FontAwesome);

const BarMusicPlayer = ({ navigation }) => {
  const { playingSongs, updateCurrentSongData, currentSongData } =
    useContext(PlayingContext);

  const playBackState = usePlaybackState();

  const togglePlay = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack !== null) {
      if (playBackState === State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const handleNext = async () => {
    const songIndex = playingSongs.findIndex(
      (songItem) => songItem.tokenId === currentSongData.tokenId
    );
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();

    const song = playingSongs[songIndex + 1];

    if (currentTrackIndex < playingSongs.length - 1) {
      await TrackPlayer.skipToNext();
      await TrackPlayer.play();

      updateCurrentSongData(song);
    }
  };

  const iconPlay = playBackState !== State.Playing ? "play" : "pause";

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate("ModalMusicPlayer")}
      style={styles.container}
    >
      <Image
        source={
          currentSongData.image
            ? { uri: currentSongData.image }
            : require("../../assets/icon.png")
        }
        style={styles.image}
      />
      {currentSongData && (
        <View>
          <View style={styles.containerSong}>
            <Text
              style={styles.title}
              numberOfLines={1}
            >{`${currentSongData.title}`}</Text>
          </View>
        </View>
      )}
      {playBackState === State.Buffering ? (
        <TouchableOpacity
          activeOpacity={gStyle.activeOpacity}
          hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
          onPress={() => {}}
        >
          <AnimatedFontAwesome
            name="refresh"
            color={colors.white}
            animation="rotate"
            duration={10000}
            size={28}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={gStyle.activeOpacity}
          hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
          onPress={togglePlay}
        >
          <FontAwesome color={colors.white} name={iconPlay} size={28} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        activeOpacity={gStyle.activeOpacity}
        hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
        style={styles.containerIconRight}
        onPress={handleNext}
      >
        <FontAwesome color={colors.white} name="step-forward" size={28} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

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
    backgroundColor: colors.blackBlur,
    borderBottomColor: colors.greyInactive,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    width: "100%",
    elevation: 5,
    alignItems: "center",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 15,
  },
  containerIconRight: {
    ...gStyle.flexCenter,
    width: 50,
  },
  containerSong: {
    overflow: "scroll",
    width: device.width - 160,
  },
  title: {
    ...gStyle.text18,
    color: colors.white,
    paddingRight: 10,
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
