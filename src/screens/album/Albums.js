import React, { useEffect } from "react";
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
import { colors, gStyle } from "../../constants";

const Albums = ({ navigation }) => {
  const [albums, setAlbums] = React.useState([]);

  const heading = navigation.getParam("heading");
  const tagline = navigation.getParam("tagline");

  useEffect(() => {
    setAlbums(navigation.getParam("albums") || []);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {heading && <Text style={styles.heading}>{heading}</Text>}
      {tagline && <Text style={styles.tagline}>{tagline}</Text>}

      <FlatList
        contentContainerStyle={styles.containerContent}
        data={albums}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={gStyle.activeOpacity}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            onPress={() => navigation.navigate("Album", { album: item })}
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
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

Albums.defaultProps = {
  heading: null,
  tagline: null,
};

Albums.propTypes = {
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
    paddingHorizontal: 10,
  },
  heading: {
    ...gStyle.textBold18,
    color: colors.white,
    paddingBottom: 6,
    paddingLeft: 16,
    textAlign: "left",
  },
  tagline: {
    ...gStyle.text12,
    color: colors.greyInactive,
    paddingBottom: 6,
    paddingLeft: 16,
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
    ...gStyle.textBold12,
    color: colors.white,
    marginTop: 4,
    textAlign: "center",
  },
});

export default withNavigation(Albums);
