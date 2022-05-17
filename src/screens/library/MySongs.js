import { FlatList, StyleSheet, View } from "react-native";
import { device, gStyle } from "../../constants";
import React, { useContext, useEffect, useState } from "react";
import ScreenHeader from "../../components/ScreenHeader";
import { UserContext, PlayingContext } from "../../contexts";
import { getUserOwnedSongs } from "../../api";
import LineItemSong from "../../components/LineItemSong";
import Loading from "../utils/Loading";
import TrackPlayer from "react-native-track-player";
import SetupPlayer from "../playing/SetupPlayer";

const MySongs = () => {
  //   const { showTabBarState, updateShowTabBarState } = useContext(ScreenContext);
  const { updateCurrentSongData, songs, updateSongs, currentSongData } =
    useContext(PlayingContext);
  const { getUser } = useContext(UserContext);

  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    SetupPlayer(songs);
  }, [songs]);

  const handleSongs = async () => {
    const user = await getUser();

    console.log(user.id);

    if (songs.length === 0) {
      try {
        const response = await getUserOwnedSongs({ userid: 1 });
        updateSongs(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePress = async (songData) => {
    updateCurrentSongData(songData);

    const songIndex = songs.findIndex(
      (song) => song.tokenId === songData.tokenId
    );

    await TrackPlayer.skip(songIndex);
    await TrackPlayer.play();
  };

  useEffect(() => {
    handleSongs();
  });

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader showBack={true} title="Your Songs" />
      </View>
      {songs.length === 0 ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={styles.containerFlatlist}
          data={songs}
          keyExtractor={(song) => song.tokenId}
          renderItem={({ item }) => (
            <LineItemSong
              active={currentSongData.title === item.title}
              downloaded={downloaded}
              key={item.tokenId}
              onPress={handlePress}
              songData={{
                tokenId: item.tokenId,
                album: item.contractAddress,
                artist: "Anthony",
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
