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

const BigAlbumsHorizontal = ({ data, heading, navigation }) => (
  <View style={styles.container}>
    {heading && <Text style={styles.heading}>{heading}</Text>}

    <FlatList
      contentContainerStyle={styles.containerContent}
      data={data}
      horizontal
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
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
          <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

BigAlbumsHorizontal.defaultProps = {
  heading: null,
  tagline: null,
};

BigAlbumsHorizontal.propTypes = {
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
  heading: {
    ...gStyle.textBold30,
    color: colors.white,
    paddingBottom: 6,
    paddingLeft: 16,
    textAlign: "left",
  },
  item: {
    marginRight: 15,
    width: 250,
  },
  image: {
    backgroundColor: colors.greyLight,
    height: 350,
    width: 250,
    borderRadius: 5,
  },
  title: {
    ...gStyle.textBold12,
    color: colors.white,
    marginTop: 4,
    textAlign: "center",
  },
});

export default withNavigation(BigAlbumsHorizontal);
