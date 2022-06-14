/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { colors, device, func, gStyle } from "../../../constants";
import { ScreenContext, PlayingContext, UserContext } from "../../../contexts";
import TrackPlayer, {
  usePlaybackState,
  State,
  Event,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { getUserPlaylistById } from "../../../api";
import SetupPlayer from "../../playing/SetupPlayer";

// components
import LinearGradient from "../../../components/LinearGradient";
import LineItemSong from "../../../components/LineItemSong";
import TouchIcon from "../../../components/TouchIcon";
import TouchText from "../../../components/TouchText";
import Loading from "../../../components/Loading";

const Playlist = ({ navigation }) => {
  const { getUser } = useContext(UserContext);
  const { showTabBarState, updateShowTabBarState } = useContext(ScreenContext);
  const {
    currentSongData,
    updateCurrentSongData,
    playingSongs,
    updatePlayingSongs,
    repeat,
  } = useContext(PlayingContext);
  const playlistColor = navigation.getParam("playlistColor");
  const playBackState = usePlaybackState();
  const [playlist, setPlaylist] = useState(null);
  const [downloaded, setDownloaded] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));

  const activeSongTitle = currentSongData ? currentSongData.title : "";

  useEffect(async () => {
    const playlistParam = navigation.getParam("playlist");

    const user = await getUser();

    try {
      const response = await getUserPlaylistById({
        userid: user.id,
        playlistId: playlistParam.id,
      });

      if (response && response.data) {
        const playlists = response.data.data.map((playlistRec) => {
          return {
            ...playlistRec,
            songs: playlistRec.userPlaylistSongs.map(
              (userPlaylistSong) => userPlaylistSong.song
            ),
          };
        });
        setPlaylist(playlists[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [navigation, playlist]);

  const toggleDownloaded = (val) => {
    // if web
    if (device.web) {
      setDownloaded(val);
      return;
    }

    // remove downloads alert
    if (val === false) {
      Alert.alert(
        "Remove from Downloads?",
        "You won't be able to play this offline.",
        [
          { text: "Cancel" },
          {
            onPress: () => {
              setDownloaded(false);
            },
            text: "Remove",
          },
        ],
        { cancelable: false }
      );
    } else {
      setDownloaded(val);
    }
  };

  // THis is called anytime the a track is changed, either by pressing the next or previous buttons, or auto change
  useTrackPlayerEvents([Event.PlaybackTrackChanged], (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      updateCurrentSongData(playingSongs[event.nextTrack]);
    }
  });

  const handlePress = async (songData) => {
    await SetupPlayer(playlist.songs, repeat);

    updatePlayingSongs(playlist.songs);

    const songIndex = playlist.songs.findIndex(
      (song) => song.tokenId === songData.tokenId
    );

    await TrackPlayer.skip(songIndex);
    await TrackPlayer.play();
  };
  const handlePlayAll = async (action) => {
    if (action === "play") {
      await SetupPlayer(playlist.songs, repeat);

      updatePlayingSongs(playlist.songs);

      await TrackPlayer.play();
    } else if (action === "shufflePlay") {
      await SetupPlayer(func.shuffle(playlist.songs), repeat);

      updatePlayingSongs(playlist.songs);

      await TrackPlayer.play();
    } else {
      updateCurrentSongData(null);

      updatePlayingSongs([]);

      await TrackPlayer.stop();
    }
  };

  const stickyArray = device.web ? [] : [0];
  const headingRange = device.web ? [140, 200] : [230, 280];
  const shuffleRange = device.web ? [40, 80] : [40, 80];

  const opacityHeading = scrollY.interpolate({
    inputRange: headingRange,
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const opacityShuffle = scrollY.interpolate({
    inputRange: shuffleRange,
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // Playlist data not set?
  if (playlist === null) {
    return <Loading />;
  }

  return (
    <View style={gStyle.container}>
      {!showTabBarState ? (
        <BlurView intensity={99} style={styles.blurview} tint="dark" />
      ) : null}

      <View style={styles.containerHeader}>
        <Animated.View
          style={[styles.headerLinear, { opacity: opacityHeading }]}
        >
          <LinearGradient fill={playlistColor} height={89} />
        </Animated.View>
        <View style={styles.header}>
          <TouchIcon
            style={styles.headerBtn}
            icon={<Feather color={colors.white} name="chevron-left" />}
            onPress={() => navigation.goBack(null)}
          />
          <Animated.View style={{ opacity: opacityShuffle }}>
            <Text style={styles.headerTitle}>{Playlist.title}</Text>
          </Animated.View>
          <TouchIcon
            style={styles.headerBtn}
            icon={<Feather color={colors.white} name="more-vertical" />}
            onPress={() => {
              updateShowTabBarState(false);

              navigation.navigate("ModalPlaylistOptions", {
                playlist,
              });
            }}
          />
        </View>
      </View>

      <View style={styles.containerFixed}>
        <View style={styles.containerLinear}>
          <LinearGradient fill={playlistColor} />
        </View>
        <View style={styles.containerImage}>
          {playlist.imageUrl ? (
            <Image source={{ uri: playlist.imageUrl }} style={styles.image} />
          ) : (
            <View
              style={[styles.image, { backgroundColor: colors.greyInactive }]}
            />
          )}
        </View>
        <View style={styles.containerTitle}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
            {playlist.name}
          </Text>
        </View>
      </View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={stickyArray}
        style={styles.containerScroll}
      >
        <View style={styles.containerSticky}>
          <Animated.View
            style={[styles.containerStickyLinear, { opacity: opacityShuffle }]}
          >
            <LinearGradient fill={colors.black20} height={50} />
          </Animated.View>
          <View style={styles.containerShuffle}>
            <TouchText
              disabled={playlist.songs ? false : true}
              onPress={() => {
                handlePlayAll(
                  playBackState === State.Playing ? "stop" : "play"
                );
              }}
              style={styles.btn}
              styleText={styles.btnText}
              icon={playBackState === State.Playing ? "stop" : "play"}
              styleIcon={styles.btnIcon}
              text={playBackState === State.Playing ? "Stop" : "Play"}
            />
            <TouchText
              onPress={() => {
                handlePlayAll(
                  playBackState === State.Playing ? "stop" : "shufflePlay"
                );
              }}
              style={styles.btn}
              styleText={styles.btnText}
              icon="random"
              styleIcon={styles.btnIcon}
              text="Shuffle"
            />
          </View>
        </View>
        <View style={styles.containerSongs}>
          <View style={styles.row}>
            <Text style={styles.downloadText}>
              {downloaded ? "Downloaded" : "Download"}
            </Text>
            <Switch
              trackColor={colors.greySwitchBorder}
              onValueChange={(val) => toggleDownloaded(val)}
              value={downloaded}
            />
          </View>

          {playlist.songs &&
            playlist.songs.map((song, index) => (
              <LineItemSong
                active={activeSongTitle === song.title}
                downloaded={downloaded}
                key={index.toString()}
                onPress={handlePress}
                songData={song}
              />
            ))}
        </View>
        <View style={gStyle.spacer16} />
      </Animated.ScrollView>
    </View>
  );
};

Playlist.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  blurview: {
    ...StyleSheet.absoluteFill,
    zIndex: 101,
  },
  containerHeader: {
    height: 89,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 100,
  },
  headerLinear: {
    height: 89,
    width: "100%",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: device.iPhoneNotch ? 48 : 24,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  headerBtn: {
    height: 50,
    justifyContent: "flex-start",
  },
  headerTitle: {
    ...gStyle.textBold16,
    color: colors.white,
    marginTop: 2,
    paddingHorizontal: 8,
    textAlign: "center",
    width: device.width - 100,
  },
  containerFixed: {
    alignItems: "center",
    paddingTop: device.iPhoneNotch ? 94 : 60,
    position: "absolute",
    width: "100%",
  },
  containerLinear: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: device.web ? 5 : 0,
  },
  containerImage: {
    shadowColor: colors.black,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    zIndex: device.web ? 20 : 0,
  },
  image: {
    height: 148,
    marginBottom: device.web ? 0 : 16,
    width: 148,
  },
  containerTitle: {
    marginTop: device.web ? 8 : 0,
    zIndex: device.web ? 20 : 0,
  },
  title: {
    ...gStyle.textBold20,
    color: colors.white,
    marginBottom: 8,
    paddingHorizontal: 24,
    textAlign: "center",
  },
  containerPlaylist: {
    zIndex: device.web ? 20 : 0,
  },
  PlaylistInfo: {
    ...gStyle.text12,
    color: colors.greyInactive,
    marginBottom: 48,
  },
  containerScroll: {
    paddingTop: 89,
  },
  containerSticky: {
    marginTop: device.iPhoneNotch ? 238 : 194,
  },
  containerShuffle: {
    flexDirection: "row",
    justifyContent: "space-around",
    // alignItems: "center",
    height: 50,
    shadowColor: colors.blackBg,
    shadowOffset: { height: -10, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  containerStickyLinear: {
    position: "absolute",
    top: 0,
    width: "100%",
  },
  btn: {
    backgroundColor: colors.grey,
    borderRadius: 5,
    height: 40,
    width: "40%",
    flexDirection: "row",
  },
  btnText: {
    ...gStyle.textBold16,
    color: colors.brandPrimary,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  btnIcon: {
    color: colors.brandPrimary,
    marginRight: 10,
  },
  containerSongs: {
    alignItems: "center",
    backgroundColor: colors.blackBg,
    minHeight: 540,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    width: "100%",
  },
  downloadText: {
    ...gStyle.textBold18,
    color: colors.white,
  },
});

export default Playlist;
