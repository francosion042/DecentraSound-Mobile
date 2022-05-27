import { FlatList, StyleSheet, View } from "react-native";
import { device, gStyle } from "../../constants";
import React, { useContext, useState } from "react";
import ScreenHeader from "../../components/ScreenHeader";
import { PlayingContext, LibraryContext } from "../../contexts";
import LineItemSong from "../../components/LineItemSong";
import Loading from "../utils/Loading";
import TrackPlayer from "react-native-track-player";
import SetupPlayer from "../playing/SetupPlayer";

const MySongs = () => {
  const { updateCurrentSongData, currentSongData, updatePlayingSongs, repeat } =
    useContext(PlayingContext);
  const { userOwnedSongs } = useContext(LibraryContext);

  const [downloaded] = useState(false);

  /**
   * @todo the setupPlayer() should be called when a user clicks a song, it checks if there's no active setup for mySongs
   *
   */

  const handlePress = async (songData) => {
    updateCurrentSongData(songData);
    await SetupPlayer(userOwnedSongs, repeat);

    updatePlayingSongs(userOwnedSongs);

    const songIndex = userOwnedSongs.findIndex(
      (song) => song.tokenId === songData.tokenId
    );

    await TrackPlayer.skip(songIndex);
    await TrackPlayer.play();
  };

  const activeSongTitle = currentSongData ? currentSongData.title : "";

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader showBack={true} title="Your Songs" />
      </View>
      {userOwnedSongs.length === 0 ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={styles.containerFlatlist}
          data={userOwnedSongs}
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
                artist: "Artist",
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

export default MySongs;
