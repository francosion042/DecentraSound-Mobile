import * as React from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { withNavigation } from "react-navigation";
import { colors, gStyle } from "../constants";

const AlbumsBannerHorizontal = ({ data, navigation }) => (
  <View style={styles.container}>
    <FlatList
      contentContainerStyle={styles.containerContent}
      data={data}
      horizontal
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          {item.name && <Text style={styles.heading}>{item.name}</Text>}
          {item.artist.name && (
            <Text style={styles.tagline}>{item.artist.name}</Text>
          )}

          <TouchableOpacity
            activeOpacity={gStyle.activeOpacity}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            onPress={() => navigation.navigate("Album", { album: item })}
          >
            <View style={styles.image}>
              {item.coverImageUrl && (
                <ImageBackground
                  source={{ uri: item.coverImageUrl }}
                  style={styles.image}
                >
                  <View style={{ ...gStyle.flex1 }} />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                      {item.description.substring(0, 100)}....
                    </Text>
                  </View>
                </ImageBackground>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

AlbumsBannerHorizontal.defaultProps = {
  heading: null,
  tagline: null,
};

AlbumsBannerHorizontal.propTypes = {
  // required
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,

  // optional
  heading: PropTypes.string,
  tagline: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    width: "100%",
  },
  containerContent: {
    paddingLeft: 16,
  },
  itemContainer: {
    flexDirection: "column",
  },
  heading: {
    ...gStyle.textBold24,
    color: colors.white,
    paddingBottom: 6,
    textAlign: "left",
  },
  tagline: {
    ...gStyle.text12,
    color: colors.greyInactive,
    paddingBottom: 6,
    textAlign: "left",
  },
  image: {
    backgroundColor: colors.greyLight,
    marginRight: 15,
    height: 350,
    width: 400,
    borderRadius: 15,
  },
  title: {
    ...gStyle.textBold14,
    color: colors.white,
    marginVertical: 15,
    textAlign: "left",
  },
  titleContainer: {
    backgroundColor: colors.black20,
    paddingHorizontal: 15,
  },
});

export default withNavigation(AlbumsBannerHorizontal);
