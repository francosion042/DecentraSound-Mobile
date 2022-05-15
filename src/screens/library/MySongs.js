import { FlatList, StyleSheet, View } from "react-native";
import { device, gStyle } from "../../constants";
import React, { useContext, useEffect, useState } from "react";
import ScreenHeader from "../../components/ScreenHeader";
import { ScreenContext, UserContext } from "../../contexts";
import { getUserOwnedSongs } from "../../api/user";

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

  const handleSongs = async () => {
    const user = await getUser();

    console.log(user.id);

    try {
      const response = await getUserOwnedSongs({ userid: 1 });
      console.log(response.data.data);
      // setSongs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSongs();
  });

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader title="Your Library" />
      </View>

      {/* <FlatList
        contentContainerStyle={styles.containerFlatlist}
        data={songs}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <LineItemSong
            active={song === track.title}
            downloaded={downloaded}
            key={index.toString()}
            onPress={changeSongData}
            songData={{
              album: album.title,
              artist: album.artist,
              image: album.image,
              length: track.seconds,
              title: track.title,
            }}
          />
        )}
      /> */}
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
