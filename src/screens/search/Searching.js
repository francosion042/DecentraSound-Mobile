/* eslint-disable react-hooks/exhaustive-deps */
import { View, TextInput, StyleSheet, FlatList, Text } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import TrackPlayer from "react-native-track-player";
import SetupPlayer from "../playing/SetupPlayer";
import { colors, device, gStyle } from "../../constants";

// Components
import TouchIcon from "../../components/TouchIcon";
import LineItemAlbum from "../../components/LineItemAlbum";
import LineItemSong from "../../components/LineItemSong";
import LineItemArtist from "../../components/LineItemArtist";
import { search } from "../../api";
import { PlayingContext, SearchContext } from "../../contexts";
import { TouchableOpacity } from "react-native-gesture-handler";
import TouchText from "../../components/TouchText";

const Searching = ({ navigation }) => {
  const { updateCurrentSongData, currentSongData, updatePlayingSongs, repeat } =
    useContext(PlayingContext);
  const { getSearchHistory, storeSearchHistory, clearSearchHistory } =
    useContext(SearchContext);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultSongs, setSearchResultSongs] = useState([]);
  const [recentlySearched, setRecentlySearched] = useState([]);

  const activeSongTitle = currentSongData ? currentSongData.title : "";

  const handleSearch = async (searchTerm) => {
    try {
      const response = await search(searchTerm);
      if (response && response.data.data) {
        setSearchResult(response.data.data);
        setRecentlySearched([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSongPress = async (songData) => {
    const songIndex = searchResultSongs.findIndex(
      (song) => song.tokenId === songData.tokenId
    );

    updatePlayingSongs([searchResultSongs[songIndex]]);
    updateCurrentSongData(songData);

    await SetupPlayer([searchResultSongs[songIndex]], repeat);

    await TrackPlayer.play();
  };

  useEffect(async () => {
    const searchHistory = await getSearchHistory();

    setRecentlySearched(searchHistory);
    setSearchResult(searchHistory);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TouchIcon
          icon={<Feather color={colors.brandPrimary} name="chevron-left" />}
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
      {recentlySearched.length !== 0 ? (
        <View style={styles.clearBtnContainer}>
          <Text style={styles.clearSearchText}>Recently Searched</Text>
          <TouchText
            text="Clear"
            onPress={() => {
              clearSearchHistory();
              setSearchResult([]);
              setRecentlySearched([]);
            }}
            style={styles.btn}
            styleText={styles.btnText}
          />
        </View>
      ) : null}
      <FlatList
        contentContainerStyle={styles.containerFlatlist}
        data={searchResult}
        keyExtractor={(item) => item.dataId.toString()}
        renderItem={({ item }) => {
          if (item.resultType === "album") {
            return (
              <LineItemAlbum
                key={item.dataId.toString()}
                onPress={() => {
                  storeSearchHistory(item);
                  navigation.navigate("Album", { album: item.album });
                }}
                album={item.album}
              />
            );
          } else if (item.resultType === "song") {
            return (
              <TouchableOpacity
                key={item.dataId.toString()}
                onPress={() => {
                  storeSearchHistory(item);
                  setSearchResultSongs([item.song]);
                }}
              >
                <LineItemSong
                  navigation={navigation}
                  active={activeSongTitle === item.song.title}
                  key={item.song.tokenId.toString()}
                  onPress={handleSongPress}
                  songData={item.song}
                />
              </TouchableOpacity>
            );
          } else {
            return (
              <LineItemArtist
                key={item.dataId.toString()}
                onPress={() => {
                  storeSearchHistory(item);
                  navigation.navigate("Artist", { artist: item.artist });
                }}
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
  clearBtnContainer: {
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  clearSearchText: {
    ...gStyle.textBold18,
    color: colors.white,
  },
  btn: {
    backgroundColor: colors.grey,
    borderRadius: 5,
    height: 20,
    width: "20%",
    flexDirection: "row",
  },
  btnText: {
    ...gStyle.textBold12,
    color: colors.red,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});

export default Searching;
