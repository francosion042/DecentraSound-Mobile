/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import { colors, device, func, gStyle } from "../../../constants";
import ScreenHeader from "../../../components/ScreenHeader";
import { LibraryContext, UserContext } from "../../../contexts";
import { getUserPlaylists, addSongToPlaylist } from "../../../api";
import Loading from "../../../components/Loading";

const Playlists = ({ navigation }) => {
  const { getUser } = useContext(UserContext);
  const { userPlaylists, updateUserPlaylists } = useContext(LibraryContext);
  const [isLoading, setIsLoading] = useState(true);

  const createPlaylistButton = {
    id: 0,
    name: "Create Playlist",
    imageUrl: "",
  };
  const handlePlaylists = async () => {
    const user = await getUser();

    try {
      const response = await getUserPlaylists({ userid: user.id });

      if (response && response.data) {
        const playlists = response.data.data.map((playlist) => {
          return {
            ...playlist,
            songs: playlist.userPlaylistSongs.map(
              (userPlaylistSong) => userPlaylistSong.song
            ),
          };
        });

        updateUserPlaylists([createPlaylistButton, ...playlists]);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = async (item) => {
    if (item.id === 0) {
      navigation.navigate("CreatePlaylist");
    } else {
      let addSong = navigation.getParam("addSongToPlaylist");
      if (addSong) {
        try {
          const response = await addSongToPlaylist({
            playlistId: item.id,
            songId: addSong.songId,
          });

          if (response && response.data) {
            navigation.setParams({ addSongToPlaylist: null });
            navigation.navigate("Playlist", {
              playlist: item,
              playlistColor: func.getRandomColor(),
            });
          }
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        navigation.navigate("Playlist", {
          playlist: item,
          playlistColor: func.getRandomColor(),
        });
      }
    }
  };

  useEffect(() => {
    if (userPlaylists.length !== 0) {
      setIsLoading(false);
    }
    handlePlaylists();
  }, []);

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader showBack={true} title="Playlists" />
      </View>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={styles.containerContent}
          data={userPlaylists}
          numColumns={2}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={gStyle.activeOpacity}
              hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              onPress={() => handlePress(item)}
              style={styles.item}
            >
              {item.id === 0 ? (
                <View style={styles.image}>
                  <FontAwesome name="plus" size={60} style={styles.addIcon} />
                </View>
              ) : (
                <View style={styles.image}>
                  {item.imageUrl && (
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.image}
                    />
                  )}
                </View>
              )}
              <Text
                style={[
                  styles.title,
                  { color: item.id === 0 ? colors.brandPrimary : colors.white },
                ]}
                numberOfLines={1}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

Playlists.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  containerContent: {
    marginTop: device.iPhoneNotch ? 88 : 64,
    justifyContent: "space-around",
    alignItems: "center",
  },
  item: {
    marginHorizontal: 30,
    marginBottom: 30,
    width: 148,
  },
  image: {
    backgroundColor: colors.greyLight,
    height: 148,
    width: 148,
    borderRadius: 5,
  },
  addIcon: {
    color: colors.greyOff,
    alignSelf: "center",
    marginTop: "30%",
  },
  title: {
    ...gStyle.textBold14,
    marginTop: 4,
    textAlign: "center",
  },
});

export default withNavigation(Playlists);
