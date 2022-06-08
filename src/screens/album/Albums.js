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
import { colors, device, gStyle } from "../../constants";
import ScreenHeader from "../../components/ScreenHeader";

const Albums = ({ navigation }) => {
  const [albums, setAlbums] = React.useState([]);

  const heading = navigation.getParam("heading");

  useEffect(() => {
    setAlbums(navigation.getParam("albums") || []);
  }, [navigation]);

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader showBack={true} title={heading} />
      </View>

      <FlatList
        contentContainerStyle={styles.containerContent}
        data={albums}
        numColumns={2}
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
  navigation: PropTypes.object.isRequired,

  // optional
  heading: PropTypes.string,
  tagline: PropTypes.string,
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
  title: {
    ...gStyle.textBold12,
    color: colors.white,
    marginTop: 4,
    textAlign: "center",
  },
});

export default withNavigation(Albums);
