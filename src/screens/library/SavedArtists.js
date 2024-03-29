/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { withNavigation, NavigationEvents } from "react-navigation";
import { colors, device, gStyle } from "../../constants";
import ScreenHeader from "../../components/ScreenHeader";
import { LibraryContext, UserContext } from "../../contexts";
import { getUserSavedArtists } from "../../api";
import Loading from "../../components/Loading";

const SavedArtists = ({ navigation }) => {
  const { getUser } = useContext(UserContext);
  const { userSavedArtists, updateUserSavedArtists } =
    useContext(LibraryContext);
  const [isLoading, setIsLoading] = useState(true);

  const handleSavedArtists = async () => {
    const user = await getUser();

    try {
      const response = await getUserSavedArtists({ userid: user.id });

      if (response && response.data) {
        const artists = response.data.data.map(
          (savedArtist) => savedArtist.artist
        );
        updateUserSavedArtists(artists);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userSavedArtists.length !== 0) {
      setIsLoading(false);
    }
  }, []);

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader showBack={true} title="Saved Artists" />
      </View>
      <NavigationEvents
        onWillFocus={() => {
          // Do your things here
          handleSavedArtists();
        }}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={styles.containerContent}
          data={userSavedArtists}
          numColumns={2}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={gStyle.activeOpacity}
              hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              onPress={() => navigation.navigate("Artist", { artist: item })}
              style={styles.item}
            >
              <View style={styles.image}>
                {item.imageUrl && (
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                )}
              </View>
              <Text style={styles.title} numberOfLines={1}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

SavedArtists.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
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
    ...gStyle.textBold14,
    color: colors.white,
    marginTop: 4,
    textAlign: "center",
  },
});

export default withNavigation(SavedArtists);
