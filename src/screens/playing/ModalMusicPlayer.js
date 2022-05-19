import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  Feather,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import TrackPlayer, {
  useProgress,
  usePlaybackState,
  State,
  RepeatMode,
  useTrackPlayerEvents,
  Event,
} from "react-native-track-player";
import { colors, device, func, gStyle } from "../../constants";
import { PlayingContext } from "../../contexts";

// components
import ModalHeader from "../../components/ModalHeader";
import TouchIcon from "../../components/TouchIcon";

const ModalMusicPlayer = ({ navigation }) => {
  const {
    currentSongData,
    songs,
    updateCurrentSongData,
    toggleRepeat,
    repeat,
  } = useContext(PlayingContext);
  const [favorited, setFavorited] = useState(false);
  const playBackState = usePlaybackState();
  const progress = useProgress();

  // THis is called anytime the a track is changed, either by pressing the next or previous buttons, or auto change
  useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      updateCurrentSongData(songs[event.nextTrack]);
    }
  });

  const toggleFavorite = () => {
    setFavorited(!favorited);
  };

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

  const handlePrevious = async () => {
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();

    if (currentTrackIndex !== 0) {
      await TrackPlayer.skipToPrevious();
      await TrackPlayer.play();
    }
  };

  const handleNext = async () => {
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();

    if (currentTrackIndex < songs.length - 1) {
      await TrackPlayer.skipToNext();
      await TrackPlayer.play();
    }
  };

  const handleToggleRepeat = () => {
    if (repeat === "Off") {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      toggleRepeat();
    }
    if (repeat === "Track") {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      toggleRepeat();
    }
    if (repeat === "Queue") {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      toggleRepeat();
    }
  };

  const favoriteColor = favorited ? colors.brandPrimary : colors.white;
  const favoriteIcon = favorited ? "heart" : "heart-o";
  const iconPlay =
    playBackState !== State.Playing ? "play-circle" : "pause-circle";
  const repeatIcon =
    repeat === "Off"
      ? "repeat-off"
      : repeat === "Track"
      ? "repeat-once"
      : "repeat";

  const timePast = func.formatTime(progress.position);
  const timeTotal = func.formatTime(progress.duration);

  return (
    <View style={gStyle.container}>
      <ModalHeader
        left={<Feather color={colors.greyLight} name="chevron-down" />}
        leftPress={() => navigation.goBack(null)}
        right={<Feather color={colors.greyLight} name="more-horizontal" />}
        text={currentSongData.contractAddress}
      />

      <View style={gStyle.p3}>
        <Image
          source={
            currentSongData.image
              ? { uri: currentSongData.image }
              : require("../../../assets/icon.png")
          }
          style={styles.image}
        />

        <View style={[gStyle.flexRowSpace, styles.containerDetails]}>
          <View style={styles.containerSong}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.song}>
              {currentSongData.title}
            </Text>
            <Text style={styles.artist}>{currentSongData.artist}</Text>
          </View>
          <View style={styles.containerFavorite}>
            <TouchIcon
              icon={<FontAwesome color={favoriteColor} name={favoriteIcon} />}
              onPress={toggleFavorite}
            />
          </View>
        </View>

        <View style={styles.containerVolume}>
          <Slider
            minimumValue={0}
            value={progress.position}
            maximumValue={progress.duration}
            onSlidingComplete={async (value) => {
              await TrackPlayer.seekTo(value);
            }}
            minimumTrackTintColor={colors.white}
            maximumTrackTintColor={colors.grey3}
          />
          <View style={styles.containerTime}>
            <Text style={styles.time}>{timePast}</Text>
            <Text style={styles.time}>{`${timeTotal}`}</Text>
          </View>
        </View>

        <View style={styles.containerControls}>
          <TouchIcon
            icon={<Feather color={colors.greyLight} name="shuffle" />}
            onPress={() => null}
          />
          <View style={gStyle.flexRowCenterAlign}>
            <TouchIcon
              icon={<FontAwesome color={colors.white} name="step-backward" />}
              iconSize={32}
              onPress={handlePrevious}
            />
            <View style={gStyle.pH5}>
              <TouchIcon
                icon={
                  <FontAwesome color={colors.brandPrimary} name={iconPlay} />
                }
                iconSize={80}
                onPress={togglePlay}
              />
            </View>
            <TouchIcon
              icon={<FontAwesome color={colors.white} name="step-forward" />}
              iconSize={32}
              onPress={handleNext}
            />
          </View>
          <TouchIcon
            icon={
              <MaterialCommunityIcons
                color={colors.greyLight}
                name={repeatIcon}
              />
            }
            iconSize={32}
            onPress={handleToggleRepeat}
          />
        </View>

        <View style={styles.containerBottom}>
          <TouchIcon
            icon={<Feather color={colors.greyLight} name="speaker" />}
            onPress={() => null}
          />
          <TouchIcon
            icon={
              <MaterialIcons color={colors.greyLight} name="playlist-play" />
            }
            iconSize={32}
            onPress={() => null}
          />
        </View>
      </View>
    </View>
  );
};

ModalMusicPlayer.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  image: {
    height: device.width - 60,
    marginVertical: device.iPhoneNotch ? 36 : 10,
    width: device.width - 60,
    marginBottom: "10%",
    borderRadius: 10,
    alignSelf: "center",
  },
  containerDetails: {
    marginBottom: 16,
  },
  containerSong: {
    flex: 6,
  },
  song: {
    ...gStyle.textBold24,
    color: colors.white,
  },
  artist: {
    ...gStyle.text18,
    color: colors.greyInactive,
  },
  containerFavorite: {
    alignItems: "flex-end",
    flex: 1,
    justifyContent: "center",
  },
  containerTime: {
    ...gStyle.flexRowSpace,
  },
  time: {
    ...gStyle.text14,
    color: colors.greyInactive,
  },
  containerControls: {
    ...gStyle.flexRowSpace,
    marginTop: device.iPhoneNotch ? 24 : "15%",
  },
  containerBottom: {
    ...gStyle.flexRowSpace,
    marginTop: device.iPhoneNotch ? 32 : "8%",
  },
});

export default ModalMusicPlayer;
