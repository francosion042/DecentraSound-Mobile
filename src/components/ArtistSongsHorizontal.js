/* eslint-disable no-shadow */
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { withNavigation } from "react-navigation";
import { colors, gStyle } from "../constants";
import { PlayingContext } from "../contexts";
import LineItemSong from "./LineItemSong";

const ArtistSongsHorizontal = ({ data, heading, navigation, handlePress }) => {
  const { currentSongData } = useContext(PlayingContext);
  const [downloaded] = useState(false);

  const activeSongTitle = currentSongData ? currentSongData.title : "";

  return (
    <View style={styles.container}>
      {heading && <Text style={styles.heading}>{heading}</Text>}

      <FlatList
        data={data}
        horizontal
        renderItem={({ item, index }) => (
          <View style={styles.container}>
            <FlatList
              contentContainerStyle={styles.containerContent}
              data={item.songs.slice(0, 4)}
              keyExtractor={({ id }) => id.toString()}
              renderItem={({ item }) => (
                <LineItemSong
                  active={activeSongTitle === item.title}
                  downloaded={downloaded}
                  key={item.tokenId}
                  onPress={handlePress}
                  screen="artist"
                  songData={{
                    tokenId: item.tokenId,
                    contractAddress: item.contractAddress
                      ? item.contractAddress
                      : "Unknown Album",
                    artist: "Artist",
                    image: item.imageUrl,
                    length: 4214241,
                    title: item.title,
                  }}
                />
              )}
            />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

ArtistSongsHorizontal.defaultProps = {
  heading: null,
  tagline: null,
};

ArtistSongsHorizontal.propTypes = {
  // required
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,

  // optional
  heading: PropTypes.string,
  tagline: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
  },
  containerContent: {
    ...gStyle.pL5,
  },
  heading: {
    ...gStyle.textBold22,
    ...gStyle.pL5,
    color: colors.white,
    paddingBottom: 6,
    textAlign: "left",
  },
  item: {
    marginRight: 16,
    width: 148,
  },
  image: {
    backgroundColor: colors.greyLight,
    height: 148,
    width: 148,
    borderRadius: 5,
  },
  title: {
    ...gStyle.textBold16,
    color: colors.white,
    marginTop: 4,
    textAlign: "center",
  },
  releaseDate: {
    ...gStyle.textBold12,
    color: colors.greyInactive,
    marginTop: 4,
    textAlign: "center",
  },
});

export default withNavigation(ArtistSongsHorizontal);
