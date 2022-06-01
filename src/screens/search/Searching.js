import { View, TextInput, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { colors, device } from "../../constants";

// Components
import TouchIcon from "../../components/TouchIcon";
import LineItemAlbum from "../../components/LineItemAlbum";
import LineItemSong from "../../components/LineItemSong";
import LineItemArtist from "../../components/LineItemArtist";
import { search } from "../../api/search";

const Searching = ({ navigation }) => {
  //   const [searchTerm, setSearchTerm] = useState();
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await search(searchTerm);
      setSearchResult(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = () => {};

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
            handleSearch(searchString);
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
                onPress={handlePress}
                album={item.album}
              />
            );
          } else if (item.resultType === "song") {
            return (
              <LineItemSong
                navigation={navigation}
                key={item.song.tokenId}
                onPress={handlePress}
                songData={{
                  songId: item.id,
                  tokenId: item.tokenId,
                  contractAddress: item.contractAddress
                    ? item.contractAddress
                    : "Unknown Album",
                  artist: item.artist.name,
                  image: item.imageUrl,
                  title: item.title,
                }}
              />
            );
          } else {
            return (
              <LineItemArtist
                key={item.artist.tokenId}
                onPress={handlePress}
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
