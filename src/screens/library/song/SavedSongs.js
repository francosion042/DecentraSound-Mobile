/* eslint-disable react-hooks/exhaustive-deps */
import { FlatList, StyleSheet, View } from "react-native";
import { device, gStyle } from "../../../constants";
import React, { useContext, useEffect, useState } from "react";
import { NavigationEvents } from "react-navigation";
import ScreenHeader from "../../../components/ScreenHeader";
import { PlayingContext, LibraryContext, UserContext } from "../../../contexts";
import LineItemSong from "../../../components/LineItemSong";
import Loading from "../../../components/Loading";
import TrackPlayer from "react-native-track-player";
import SetupPlayer from "../../playing/SetupPlayer";
import { getUserSavedSongs } from "../../../api";

const SavedSongs = () => {
  const { updateCurrentSongData, currentSongData, updatePlayingSongs, repeat } =
    useContext(PlayingContext);
  const { getUser } = useContext(UserContext);
  const { userSavedSongs, updateUserSavedSongs } = useContext(LibraryContext);
  const [isLoading, setIsLoading] = useState(true);

  const handleUserSavedSongs = async () => {
    const user = await getUser();

    try {
      const response = await getUserSavedSongs({ userid: user.id });

      if (response && response.data) {
        const songs = response.data.data.map((savedSong) => savedSong.song);
        updateUserSavedSongs(songs);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userSavedSongs.length !== 0) {
      setIsLoading(false);
    }
  }, []);

  const [downloaded] = useState(false);

  /**
   * @todo the setupPlayer() should be called when a user clicks a song, it checks if there's no active setup for SavedSongs
   *
   */

  const handlePress = async (songData) => {
    updateCurrentSongData(songData);
    await SetupPlayer(userSavedSongs, repeat);

    updatePlayingSongs(userSavedSongs);

    const songIndex = userSavedSongs.findIndex(
      (song) => song.tokenId === songData.tokenId
    );

    await TrackPlayer.skip(songIndex);
    await TrackPlayer.play();
  };

  const activeSongTitle = currentSongData ? currentSongData.title : "";

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader showBack={true} title="Saved Songs" />
      </View>
      <NavigationEvents
        onWillFocus={() => {
          // Do your things here
          handleUserSavedSongs();
        }}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={styles.containerFlatlist}
          data={userSavedSongs}
          keyExtractor={(song) => song.tokenId}
          renderItem={({ item }) => (
            <LineItemSong
              active={activeSongTitle === item.title}
              downloaded={downloaded}
              key={item.tokenId}
              onPress={handlePress}
              songData={{
                songId: item.id,
                tokenId: item.tokenId,
                contractAddress: item.contractAddress
                  ? item.contractAddress
                  : "Unknown Album",
                artist: item.artist.name,
                artistId: item.artist.id,
                image: item.imageUrl,
                length: 4214241,
                title: item.title,
              }}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
  },
  containerFlatlist: {
    marginTop: device.iPhoneNotch ? 88 : 64,
  },
});

export default SavedSongs;
