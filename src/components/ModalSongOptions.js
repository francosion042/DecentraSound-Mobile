/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ScreenContext, UserContext } from "../contexts";
import {
  saveSong,
  verifySongSave,
  unsaveSong,
  likeSong,
  verifySongLike,
  unlikeSong,
  getArtist,
} from "../api";

// components
import LineItemCategory from "./LineItemCategory";

// mock data
import menuSongMoreOptions from "../mockdata/menuSongMoreOptions.json";
import { colors, gStyle } from "../constants";

const ModalSongOptions = ({ navigation }) => {
  const { getUser } = useContext(UserContext);
  const {
    songOptionsModalVisible,
    toggleSongOptionsModalVisible,
    clickedSong,
  } = useContext(ScreenContext);
  const [artist, setArtist] = useState(null);
  const [isSongSaved, setIsSongSaved] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleAction = async (action) => {
    const user = await getUser();
    if (action === "saveSong") {
      if (!isSongSaved) {
        try {
          const response = await saveSong({
            userid: user.id,
            songId: clickedSong.id,
          });

          if (response && response.data) {
            setIsSongSaved(true);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await unsaveSong({
            userid: user.id,
            songId: clickedSong.id,
          });

          if (response && response.data) {
            setIsSongSaved(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else if (action === "viewArtist" && artist !== null) {
      await toggleSongOptionsModalVisible();
      navigation.navigate("Artist", { artist: artist });
    } else if (action === "addToPlaylist") {
      await toggleSongOptionsModalVisible();
      navigation.navigate("Playlists", { addSongToPlaylist: clickedSong });
    } else if (action === "likeSong") {
      if (!liked) {
        try {
          const response = await likeSong({
            userid: user.id,
            songId: clickedSong.id,
          });
          if (response && response.data) {
            setLiked(true);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await unlikeSong({
            userid: user.id,
            songId: clickedSong.id,
          });
          if (response && response.data) {
            setLiked(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(async () => {
    const user = await getUser();
    try {
      const response = await verifySongSave({
        userid: user.id,
        songId: clickedSong.id,
      });

      if (response && response.data) {
        const isSaved = response.data.data;
        setIsSongSaved(isSaved);
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await verifySongLike({
        userid: user.id,
        songId: clickedSong.id,
      });
      if (response && response.data) {
        const isliked = response.data.data;
        setLiked(isliked);
      }
    } catch (error) {
      console.log(error);
    }

    // //////////////get Artist Data ///////////////
    try {
      const response = await getArtist({
        artistId: clickedSong.artistId,
      });

      if (response && response.data) {
        setArtist(response.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setTitle = (item) => {
    if (item.action === "saveSong") {
      return isSongSaved ? "Unsave Song" : item.title;
    }
    if (item.action === "likeSong") {
      return liked ? "Unlike Song" : item.title;
    }
  };

  const setIcon = (item) => {
    if (item.action === "saveSong") {
      return isSongSaved ? "playlist-add-check" : item.icon;
    }
    if (item.action === "likeSong") {
      return liked ? "heart" : item.icon;
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={songOptionsModalVisible}
      onRequestClose={() => {
        // this.closeButtonFunction()
      }}
    >
      <View style={styles.overlayContainer} />
      <View style={styles.wraperContainer}>
        <View style={{ ...gStyle.flex1 }}>
          <View style={styles.container}>
            <Image
              source={
                clickedSong.imageUrl
                  ? { uri: clickedSong.imageUrl }
                  : require("../../assets/icon.png")
              }
              style={styles.image}
            />
            <TouchableOpacity
              activeOpacity={gStyle.activeOpacity}
              onPress={() => {}}
              style={{ ...gStyle.flex5 }}
            >
              <Text style={styles.title} numberOfLines={1}>
                {clickedSong.title}
              </Text>
              <View style={gStyle.flexRow}>
                <Text style={styles.artist}>{clickedSong.artist.name}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {Object.keys(menuSongMoreOptions).map((index) => {
            const item = menuSongMoreOptions[index];

            return (
              <LineItemCategory
                key={item.id}
                disableRightSide
                icon={setIcon(item) || item.icon}
                iconLibrary={item.lib}
                onPress={() => handleAction(item.action)}
                title={setTitle(item) || item.title}
              />
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            toggleSongOptionsModalVisible();
          }}
        >
          <View style={styles.containerButton}>
            <Text style={styles.buttonText}>Close</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    height: "60%",
    backgroundColor: colors.black70,
  },
  wraperContainer: {
    height: "40%",
    marginTop: "auto",
    backgroundColor: colors.grey,
    display: "flex",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    width: "100%",
    borderBottomColor: colors.grey3,
    borderBottomWidth: 1,
  },
  title: {
    ...gStyle.text16,
    color: colors.white,
    marginBottom: 4,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  artist: {
    ...gStyle.text10,
    color: colors.greyInactive,
  },
  itemStyle: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  containerButton: {
    ...gStyle.flexCenter,
    ...gStyle.spacer6,
    backgroundColor: colors.brandPrimary,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
  },
});

export default ModalSongOptions;
