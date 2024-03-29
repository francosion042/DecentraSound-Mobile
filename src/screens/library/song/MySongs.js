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
import { getUserOwnedSongs } from "../../../api";

const MySongs = ({ navigation }) => {
  const { updateCurrentSongData, currentSongData, updatePlayingSongs, repeat } =
    useContext(PlayingContext);
  const { getUser } = useContext(UserContext);
  const { userOwnedSongs, updateUserOwnedSongs } = useContext(LibraryContext);
  const [isLoading, setIsLoading] = useState(true);

  const handleUserOwnedSongs = async () => {
    const user = await getUser();

    try {
      const response = await getUserOwnedSongs({ userid: user.id });
      if (response && response.data) {
        updateUserOwnedSongs(response.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userOwnedSongs.length !== 0) {
      setIsLoading(false);
    }
  }, []);

  const [downloaded] = useState(false);

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
        <ScreenHeader showBack={true} title="Songs In Your Wallet" />
      </View>
      <NavigationEvents
        onWillFocus={() => {
          // Do your things here
          handleUserOwnedSongs();
        }}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={styles.containerFlatlist}
          data={userOwnedSongs}
          keyExtractor={(song) => song.tokenId}
          renderItem={({ item, index }) => (
            <LineItemSong
              navigation={navigation}
              screen="mySongs"
              active={activeSongTitle === item.title}
              downloaded={downloaded}
              key={item.tokenId}
              onPress={handlePress}
              songData={item}
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
