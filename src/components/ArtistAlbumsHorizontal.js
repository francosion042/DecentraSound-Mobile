import * as React from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { withNavigation } from "react-navigation";
import { colors, func, gStyle } from "../constants";

const ArtistAlbumsHorizontal = ({ data, heading, navigation }) => (
  <View style={styles.container}>
    {heading && <Text style={styles.heading}>{heading}</Text>}

    <FlatList
      contentContainerStyle={styles.containerContent}
      data={data}
      horizontal
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={gStyle.activeOpacity}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          onPress={() =>
            navigation.navigate("Album", {
              album: item,
              albumColor: func.getRandomColor(),
            })
          }
          style={styles.item}
        >
          <View style={styles.image}>
            {item.coverImageUrl && (
              <Image
                source={{ uri: item.coverImageUrl }}
                style={styles.image}
              />
            )}
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.releaseDate} numberOfLines={1}>
            {item.releaseDate.split("T")[0]}
          </Text>
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

ArtistAlbumsHorizontal.defaultProps = {
  heading: null,
  tagline: null,
};

ArtistAlbumsHorizontal.propTypes = {
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

export default withNavigation(ArtistAlbumsHorizontal);
