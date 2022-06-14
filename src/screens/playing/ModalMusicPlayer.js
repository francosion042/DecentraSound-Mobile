/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, Text, View, Animated, LogBox } from "react-native";
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
import SystemSetting from "react-native-system-setting";
import * as Animatable from "react-native-animatable";
import { colors, device, func, gStyle } from "../../constants";
import { PlayingContext, UserContext } from "../../contexts";

// components
import ModalHeader from "../../components/ModalHeader";
import TouchIcon from "../../components/TouchIcon";
import { likeSong, unlikeSong, verifySongLike } from "../../api";

// custom component
const AnimatedFontAwesome = Animatable.createAnimatableComponent(FontAwesome);

const ModalMusicPlayer = ({ navigation }) => {
  const { getUser } = useContext(UserContext);
  const {
    currentSongData,
    playingSongs,
    updateCurrentSongData,
    toggleRepeat,
    repeat,
  } = useContext(PlayingContext);
  const [liked, setLiked] = useState(false);
  const [volume, setVolume] = useState();
  const [animation] = useState(new Animated.Value(0));
  const playBackState = usePlaybackState();
  const progress = useProgress();

  // THis is called anytime the a track is changed, either by pressing the next or previous buttons, or auto change
  useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      updateCurrentSongData(playingSongs[event.nextTrack]);
    }
  });

  // /////////////////////////////////////////////
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  /**
   * @dev TODO: fix issue with iOS and the reactivate feature
   */
  useEffect(() => {
    if (device.android) {
      SystemSetting.getVolume().then((v) => {
        setVolume(v);
      });
    }
  });

  // //////////////////////////////////////////////
  useEffect(async () => {
    const user = await getUser();

    try {
      const response = await verifySongLike({
        userid: user.id,
        songId: currentSongData.id,
      });
      if (response && response.data) {
        const isliked = response.data.data;
        setLiked(isliked);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // ////////////////////////////////////////////
  // generate random colors for background
  useEffect(() => {
    const intervalId = setInterval(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 5000,
      }).start(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 5000,
        }).start();
      });
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
    outputRange: ["black", "gray", "yellow", "orange", "pink", "white", "red"],
  });
  const animatedStyle = {
    backgroundColor: boxInterpolation,
  };

  const toggleLike = async () => {
    setLiked(!liked);

    const user = await getUser();

    if (!liked) {
      try {
        await likeSong({
          userid: user.id,
          songId: currentSongData.id,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await unlikeSong({
          userid: user.id,
          songId: currentSongData.id,
        });
      } catch (error) {
        console.log(error);
      }
    }
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

    if (currentTrackIndex < playingSongs.length - 1) {
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

  // //////////////////////////////////////////////
  const favoriteColor = liked ? colors.brandPrimary : colors.white;
  const favoriteIcon = liked ? "heart" : "heart-o";
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
    <Animated.View style={{ ...styles.container, ...animatedStyle }}>
      <View style={styles.containerCover}>
        <ModalHeader
          left={<Feather color={colors.greyLight} name="chevron-down" />}
          leftPress={() => navigation.goBack(null)}
          right={<Feather color={colors.greyLight} name="more-vertical" />}
          text={
            currentSongData.album ? currentSongData.album.name : "Unknown Album"
          }
        />

        <View style={gStyle.p3}>
          <View style={styles.imageContainer}>
            {currentSongData.imageUrl ? (
              <Image
                source={{ uri: currentSongData.imageUrl }}
                style={styles.image}
              />
            ) : (
              <View style={{ justifyContent: "center", height: "100%" }}>
                <FontAwesome
                  name="music"
                  size={200}
                  style={{ alignSelf: "center", color: colors.greyOff }}
                />
              </View>
            )}
          </View>

          <View style={[gStyle.flexRowSpace, styles.containerDetails]}>
            <View style={styles.containerSong}>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.song}>
                {currentSongData.title}
              </Text>
              <Text style={styles.artist}>
                {currentSongData.artist
                  ? currentSongData.artist.name
                  : "Unknown Artist"}
              </Text>
            </View>
            <View style={styles.containerFavorite}>
              <TouchIcon
                icon={<FontAwesome color={favoriteColor} name={favoriteIcon} />}
                onPress={toggleLike}
              />
            </View>
          </View>

          <View style={styles.containerProgress}>
            <Slider
              minimumValue={0}
              value={progress.position}
              maximumValue={progress.duration}
              onSlidingComplete={async (value) => {
                await TrackPlayer.seekTo(value);
              }}
              minimumTrackTintColor={colors.white}
              maximumTrackTintColor={colors.grey3}
              thumbTintColor={colors.brandPrimary}
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
                {playBackState === State.Buffering ? (
                  <TouchIcon
                    iconSize={80}
                    onPress={() => {}}
                    icon={
                      <AnimatedFontAwesome
                        name="refresh"
                        color={colors.brandPrimary}
                        animation="rotate"
                        duration={10000}
                      />
                    }
                  />
                ) : (
                  <TouchIcon
                    icon={
                      <FontAwesome
                        color={colors.brandPrimary}
                        name={iconPlay}
                      />
                    }
                    iconSize={80}
                    onPress={togglePlay}
                  />
                )}
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
          {volume && (
            <View style={styles.containerBottomVolume}>
              <FontAwesome
                color={colors.brandPrimary}
                name="volume-down"
                size={20}
              />
              <View style={styles.containerVolume}>
                <Slider
                  minimumValue={0}
                  value={volume}
                  maximumValue={1}
                  onValueChange={async (value) => {
                    await SystemSetting.setVolume(value);
                  }}
                  minimumTrackTintColor={colors.brandPrimary}
                  maximumTrackTintColor={colors.white}
                  thumbTintColor={colors.brandPrimary}
                />
              </View>
              <FontAwesome
                color={colors.brandPrimary}
                name="volume-up"
                size={18}
              />
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

ModalMusicPlayer.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCover: {
    backgroundColor: colors.black90,
    height: "100%",
  },
  imageContainer: {
    padding: 0,
    backgroundColor: colors.greyInactive,
    height: device.width - 60,
    marginVertical: 10,
    width: device.width - 60,
    marginBottom: "10%",
    borderRadius: 10,
    alignSelf: "center",
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    // marginVertical: device.iPhoneNotch ? 36 : 10,
    width: "100%",
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
  containerBottomVolume: {
    marginTop: device.iPhoneNotch ? 32 : "8%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  containerVolume: {
    width: "50%",
    justifyContent: "center",
  },
});

export default ModalMusicPlayer;
