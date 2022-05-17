import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, Text, View } from "react-native";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import TrackPlayer, {
  useProgress,
  usePlaybackState,
  State,
} from "react-native-track-player";
import { colors, device, func, gStyle } from "../../constants";
import { PlayingContext } from "../../contexts";

// components
import ModalHeader from "../../components/ModalHeader";
import TouchIcon from "../../components/TouchIcon";

const ModalMusicPlayer = ({ navigation }) => {
  const { currentSongData, songs, updateCurrentSongData } =
    useContext(PlayingContext);
  const [favorited, setFavorited] = useState(false);
  const playBackState = usePlaybackState();
  const progress = useProgress();

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
    const songIndex = songs.findIndex(
      (songItem) => songItem.tokenId === currentSongData.tokenId
    );
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();

    const song = songs[songIndex - 1];

    if (currentTrackIndex !== 0) {
      await TrackPlayer.skipToPrevious();
      await TrackPlayer.play();

      updateCurrentSongData(song);
    }
  };

  const handleNext = async () => {
    const songIndex = songs.findIndex(
      (songItem) => songItem.tokenId === currentSongData.tokenId
    );
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();

    const song = songs[songIndex + 1];

    if (currentTrackIndex < songs.length - 1) {
      await TrackPlayer.skipToNext();
      await TrackPlayer.play();

      updateCurrentSongData(song);
    }
  };

  const favoriteColor = favorited ? colors.brandPrimary : colors.white;
  const favoriteIcon = favorited ? "heart" : "heart-o";
  const iconPlay =
    playBackState !== State.Playing ? "play-circle" : "pause-circle";

  const timePast = func.formatTime(progress.position);
  const timeTotal = func.formatTime(progress.duration);

  return (
    <View style={gStyle.container}>
      <ModalHeader
        left={<Feather color={colors.greyLight} name="chevron-down" />}
        leftPress={() => navigation.goBack(null)}
        right={<Feather color={colors.greyLight} name="more-horizontal" />}
        text={currentSongData.album}
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
            <View style={gStyle.pH3}>
              <TouchIcon
                icon={<FontAwesome color={colors.white} name={iconPlay} />}
                iconSize={64}
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
            icon={<Feather color={colors.greyLight} name="repeat" />}
            onPress={() => null}
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
    height: device.width - 48,
    marginVertical: device.iPhoneNotch ? 36 : 8,
    width: device.width - 48,
    marginBottom: "10%",
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
    ...gStyle.text10,
    color: colors.greyInactive,
  },
  containerControls: {
    ...gStyle.flexRowSpace,
    marginTop: device.iPhoneNotch ? 24 : "20%",
  },
  containerBottom: {
    ...gStyle.flexRowSpace,
    marginTop: device.iPhoneNotch ? 32 : "10%",
  },
});

export default ModalMusicPlayer;
