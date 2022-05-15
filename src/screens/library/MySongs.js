import { FlatList, StyleSheet, View } from "react-native";
import { device, gStyle } from "../../constants";
import React, { useContext, useEffect, useState } from "react";
import ScreenHeader from "../../components/ScreenHeader";
import { ScreenContext, UserContext } from "../../contexts";
import { getUserOwnedSongs } from "../../api";
import LineItemSong from "../../components/LineItemSong";

const MySongs = () => {
  const {
    currentSongData,
    updateCurrentSongData,
    showTabBarState,
    updateShowTabBarState,
  } = useContext(ScreenContext);
  const { getUser } = useContext(UserContext);

  const [songs, setSongs] = useState([]);
  const [downloaded, setDownloaded] = useState(false);
  const [songTitle, setSongTitle] = useState(null);

  const handleSongs = async () => {
    const user = await getUser();

    console.log(user.id);

    if (songs.length === 0) {
      try {
        const response = await getUserOwnedSongs({ userid: 1 });
        setSongs(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeSongData = (songData) => {
    updateCurrentSongData(songData);
    setSongTitle(songData.title);
  };

  useEffect(() => {
    handleSongs();
  });

  console.log(songs);

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader title="Your Songs" />
      </View>

      <FlatList
        contentContainerStyle={styles.containerFlatlist}
        data={songs}
        keyExtractor={({ tokenId }) => tokenId.toString()}
        renderItem={({ song }) => (
          <LineItemSong
            active={songTitle === song.title}
            downloaded={downloaded}
            key={song.tokenId.toString()}
            onPress={changeSongData}
            songData={{
              album: song.contractAddress,
              artist: "Anthony",
              image: song.imageUrl,
              length: 5555555,
              title: song.title,
            }}
          />
        )}
      />
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
