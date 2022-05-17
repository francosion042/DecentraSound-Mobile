import { FlatList, StyleSheet, View } from "react-native";
import { device, gStyle } from "../../constants";
import React, { useContext, useEffect, useState } from "react";
import ScreenHeader from "../../components/ScreenHeader";
import { ScreenContext, UserContext } from "../../contexts";
import { getUserOwnedSongs } from "../../api";
import LineItemSong from "../../components/LineItemSong";
import Loading from "../utils/Loading";

const MySongs = () => {
  const { updateCurrentSongData, showTabBarState, updateShowTabBarState } =
    useContext(ScreenContext);
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
  if (songs.length === 0) {
    return <Loading />;
  }

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader showBack={true} title="Your Songs" />
      </View>

      <FlatList
        contentContainerStyle={styles.containerFlatlist}
        data={songs}
        keyExtractor={(song) => song.tokenId}
        renderItem={({ item }) => (
          <LineItemSong
            active={songTitle === item.title}
            downloaded={downloaded}
            key={item.tokenId}
            onPress={changeSongData}
            songData={{
              album: item.contractAddress,
              artist: "Anthony",
              image: item.imageUrl,
              length: 4214241,
              title: item.title,
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
