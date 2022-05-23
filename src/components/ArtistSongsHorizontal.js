import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { withNavigation } from "react-navigation";
import { colors, gStyle, device } from "../constants";
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
        pagingEnabled={false}
        fadingEdgeLength={1}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.containerContent}>
            {item.songs.slice(0, 4).map((song) => (
              <View key={song.id}>
                <LineItemSong
                  active={activeSongTitle === song.title}
                  downloaded={downloaded}
                  key={song.tokenId}
                  onPress={handlePress}
                  screen="artist"
                  songData={{
                    tokenId: song.tokenId,
                    contractAddress: song.contractAddress
                      ? song.contractAddress
                      : "Unknown Album",
                    artist: "Artist",
                    image: song.imageUrl,
                    length: 4214241,
                    title: song.title,
                  }}
                />
              </View>
            ))}
          </View>
        )}
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
    ...gStyle.pL3,
    marginBottom: 20,
  },
  containerContent: {
    ...gStyle.pR5,
    width: device.width - 30,
    flex: 1,
    justifyContent: "space-between",
  },
  heading: {
    ...gStyle.textBold22,
    ...gStyle.pL2,
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
