import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { device, gStyle } from "../../constants";
import { LibraryContext, UserContext } from "../../contexts";
import { getUserLikedSongs, getUserOwnedSongs } from "../../api";

// components
import LineItemCategory from "../../components/LineItemCategory";
import ScreenHeader from "../../components/ScreenHeader";

// mock data
import yourLibrary from "../../mockdata/menuYourLibrary.json";

const Library = ({ navigation }) => {
  const { getUser } = useContext(UserContext);
  const {
    userOwnedSongs,
    updateUserOwnedSongs,
    userLikedSongs,
    updateUserLikedSongs,
  } = useContext(LibraryContext);

  const handleUserOwnedSongs = async () => {
    const user = await getUser();

    if (userOwnedSongs.length === 0) {
      try {
        const response = await getUserOwnedSongs({ userid: 1 });
        updateUserOwnedSongs(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUserLikedSongs = async () => {
    const user = await getUser();

    if (userLikedSongs.length === 0) {
      try {
        const response = await getUserLikedSongs({ userid: user.id });

        const songs = response.data.data.map((likedSong) => likedSong.song);

        updateUserLikedSongs(songs);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleUserOwnedSongs();
    handleUserLikedSongs();
  });

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader title="Your Library" />
      </View>

      <FlatList
        contentContainerStyle={styles.containerFlatlist}
        data={yourLibrary}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <LineItemCategory
            icon={item.icon}
            onPress={() => navigation.navigate(item.screen)}
            title={item.title}
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

export default Library;
