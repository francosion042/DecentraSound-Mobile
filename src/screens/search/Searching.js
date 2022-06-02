import { View, TextInput, StyleSheet, FlatList } from "react-native";
import React, { useContext, useState } from "react";
import { Feather } from "@expo/vector-icons";
import TrackPlayer from "react-native-track-player";
import SetupPlayer from "../playing/SetupPlayer";
import { colors, device } from "../../constants";

// Components
import TouchIcon from "../../components/TouchIcon";
import LineItemAlbum from "../../components/LineItemAlbum";
import LineItemSong from "../../components/LineItemSong";
import LineItemArtist from "../../components/LineItemArtist";
import { search } from "../../api/search";
import { PlayingContext } from "../../contexts";

const Searching = ({ navigation }) => {
  const { updateCurrentSongData, currentSongData, updatePlayingSongs, repeat } =
    useContext(PlayingContext);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultSong, setSearchResultSong] = useState([]);

  const activeSongTitle = currentSongData ? currentSongData.title : "";

  const handleSearch = async (searchTerm) => {
    try {
      const response = await search(searchTerm);
      if (response && response.data.data) {
        setSearchResult(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAlbumPress = () => {};

  const handleSongPress = async (songData) => {
    console.log("called");
    updateCurrentSongData(songData);
    await SetupPlayer(searchResultSong, repeat);

    updatePlayingSongs(searchResultSong);

    const songIndex = searchResultSong.findIndex(
      (song) => song.tokenId === songData.tokenId
    );

    await TrackPlayer.skip(songIndex);
    await TrackPlayer.play();
  };

  const handleArtistPress = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TouchIcon
          icon={<Feather color={colors.white} name="chevron-left" />}
          onPress={() => navigation.goBack(null)}
          style={styles.backIcon}
        />
        <TextInput
          style={styles.input}
          autoFocus={true}
          onChangeText={(searchString) => {
            if (searchString) {
              handleSearch(searchString);
            }
          }}
          underlineColorAndroid="transparent"
        />
      </View>
      <FlatList
        contentContainerStyle={styles.containerFlatlist}
        data={searchResult}
        renderItem={({ item }) => {
          if (item.resultType === "album") {
            return (
              <LineItemAlbum
                key={item.album.id}
                onPress={handleAlbumPress}
                album={item.album}
              />
            );
          } else if (item.resultType === "song") {
            return (
              <LineItemSong
                navigation={navigation}
                active={activeSongTitle === item.song.title}
                key={item.song.tokenId}
                onPress={() => {
                  setSearchResultSong(item.song);
                  return handleSongPress;
                }}
                songData={{
                  songId: item.song.id,
                  tokenId: item.song.tokenId,
                  contractAddress: item.song.contractAddress
                    ? item.song.contractAddress
                    : "Unknown Album",
                  artist: item.song.artist.name,
                  image: item.song.imageUrl,
                  title: item.song.title,
                }}
              />
            );
          } else {
            return (
              <LineItemArtist
                key={item.artist.id}
                onPress={handleArtistPress}
                artist={item.artist}
              />
            );
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    paddingTop: device.iPhoneNotch ? 64 : 24,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#424242",
    width: "90%",
    height: 60,
    borderRadius: 5,
    alignSelf: "center",
  },
  backIcon: {
    padding: 10,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    width: "90%",
    backgroundColor: "#424242",
    color: "#fff",
  },
});

export default Searching;
