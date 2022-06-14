/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { colors, device, gStyle } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player";

import { PlayingContext, UserContext } from "../../contexts";
import SetupPlayer from "../playing/SetupPlayer";

// Components
import ScreenHeader from "../../components/ScreenHeader";
import ArtistAlbumsHorizontal from "../../components/ArtistAlbumsHorizontal";
import ArtistSongsHorizontal from "../../components/ArtistSongsHorizontal";
import {
  getArtist,
  saveArtist,
  unsaveArtist,
  verifyArtistSave,
} from "../../api";
import Loading from "../../components/Loading";

const Artist = ({ navigation }) => {
  const { updateCurrentSongData, updatePlayingSongs, playingSongs, repeat } =
    useContext(PlayingContext);
  const { getUser } = useContext(UserContext);
  const [isArtistSaved, setIsArtistSave] = useState(false);
  const [artist, setArtist] = useState(null);

  const handlePress = async (songData) => {
    updateCurrentSongData(songData);
    await SetupPlayer(artist.songs, repeat);

    updatePlayingSongs(artist.songs);

    const songIndex = playingSongs.findIndex(
      (song) => song.tokenId === songData.tokenId
    );

    await TrackPlayer.skip(songIndex);
    await TrackPlayer.play();
  };

  const handleSave = async () => {
    const user = await getUser();

    if (!isArtistSaved) {
      try {
        const response = await saveArtist({
          userid: user.id,
          artistId: artist.id,
        });

        if (response && response.data) {
          setIsArtistSave(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await unsaveArtist({
          userid: user.id,
          artistId: artist.id,
        });

        if (response && response.data) {
          setIsArtistSave(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(async () => {
    const user = await getUser();
    const artistParam = navigation.getParam("artist");

    try {
      const response = await verifyArtistSave({
        userid: user.id,
        artistId: artistParam.id,
      });

      if (response && response.data) {
        const isSaved = response.data.data;
        setIsArtistSave(isSaved);
      }
    } catch (error) {
      console.log(error);
    }

    / /; /////////////get Artist Data ///////////////
    try {
      const response = await getArtist({
        artistId: artistParam.id,
      });

      if (response && response.data) {
        setArtist(response.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader showBack={true} title="Artist" />
      </View>
      {!artist ? (
        <Loading />
      ) : (
        <ScrollView style={styles.containerBody}>
          <View style={styles.artistHeader}>
            <View style={styles.artistIntro}>
              <Text style={styles.artistName} numberOfLines={1}>
                {artist.name}
              </Text>
              <FontAwesome
                name="play-circle"
                color={colors.brandPrimary}
                size={40}
                style={styles.playIcon}
              />
            </View>
            <View style={styles.artistIntro2}>
              <View style={styles.containerImage}>
                {artist.imageUrl && (
                  <Image
                    source={{ uri: artist.imageUrl }}
                    style={styles.artistImage}
                  />
                )}
              </View>
              <View>
                <View style={styles.artistStat}>
                  <Text style={styles.greyText}>
                    {artist.createdAt.split("T")[0]}
                  </Text>
                  <Text style={styles.whiteText}>
                    {artist.songs.length} Songs
                  </Text>
                </View>
                <TouchableOpacity style={styles.btnAd} onPress={handleSave}>
                  <FontAwesome
                    name={isArtistSaved ? "minus" : "plus"}
                    color={colors.brandPrimary}
                    size={20}
                  />
                  <Text style={styles.btnAddText}>
                    {isArtistSaved ? "Unsave Artist" : "Save Artist"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ArtistSongsHorizontal
            data={artist.albums}
            heading="Songs"
            handlePress={handlePress}
          />
          {/* <View style={styles.liner} /> */}
          <ArtistAlbumsHorizontal data={artist.albums} heading="Albums" />
          <View style={gStyle.liner} />
          <View style={styles.containerArtistDescription}>
            <Text style={styles.descriptionTitle}>About</Text>
            <Text style={styles.artistDescription}>{artist.description}</Text>
          </View>
        </ScrollView>
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
  containerBody: {
    marginTop: device.iPhoneNotch ? 88 : 64,
    height: "100%",
    // backgroundColor: "grey",
  },
  artistHeader: {
    display: "flex",
  },
  artistIntro: {
    ...gStyle.pH5,
    ...gStyle.mB3,
    ...gStyle.pT3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  artistName: {
    color: colors.white,
    ...gStyle.textBold30,
  },
  playIcon: {
    marginTop: 5,
  },
  artistIntro2: {
    ...gStyle.pH5,
    flexDirection: "row",
    paddingVertical: 10,
  },
  containerImage: {
    ...gStyle.mR4,
    height: 148,
    marginBottom: 16,
    width: 148,
    backgroundColor: colors.greyLight,
    borderRadius: 5,
  },
  artistImage: {
    height: 148,
    marginBottom: 16,
    width: 148,
  },
  artistStat: {
    ...gStyle.mB4,
    paddingVertical: 10,
  },
  greyText: {
    color: colors.greyLight,
  },
  whiteText: {
    color: colors.white,
  },
  btnAd: {
    ...gStyle.pH2,
    flexDirection: "row",
    backgroundColor: colors.grey3,
    paddingVertical: 5,
    borderRadius: 20,
  },
  btnAddText: {
    ...gStyle.mL1,
    color: colors.white,
  },
  containerArtistDescription: {
    ...gStyle.containerGrey,
    ...gStyle.pH5,
    paddingVertical: 15,
    minHeight: 100,
  },
  descriptionTitle: {
    ...gStyle.textBold22,
    color: colors.white,
    marginVertical: 5,
  },
  artistDescription: {
    color: colors.greyLight,
  },
});

export default Artist;
