import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { colors, device, gStyle } from "../../constants";
import ScreenHeader from "../../components/ScreenHeader";
import ArtistAlbumsHorizontal from "../../components/ArtistAlbumsHorizontal";

const Artist = ({ navigation }) => {
  const artist = navigation.getParam("artist");

  return (
    <ScrollView style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader showBack={true} title="Artist" />
      </View>
      <View style={styles.containerBody}>
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
              <Text>Save the Artist</Text>
              <Button title="Add" />
            </View>
          </View>
        </View>
        <View style={styles.liner} />
        <ArtistAlbumsHorizontal data={artist.albums} heading="Albums" />
        <View style={styles.liner} />
        <View style={styles.containerArtistDescription}>
          <Text style={styles.descriptionTitle}>About</Text>
          <Text style={styles.artistDescription}>{artist.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10,
  },
  liner: {
    ...gStyle.mH5,
    ...gStyle.mV3,
    backgroundColor: colors.grey3,
    height: 1,
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
  containerArtistDescription: {
    ...gStyle.containerGrey,
    ...gStyle.pH5,
    paddingVertical: 15,
    minHeight: 200,
  },
  descriptionTitle: {
    ...gStyle.textBold22,
    color: colors.white,
    marginVertical: 5,
  },
  artistDescription: {
    color: colors.white,
  },
});

export default Artist;
