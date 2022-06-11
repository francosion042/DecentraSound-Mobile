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
import { withNavigation } from "react-navigation";
import { colors, device, gStyle } from "../../constants";
import ScreenHeader from "../../components/ScreenHeader";
import { LibraryContext, UserContext } from "../../contexts";
import { getUserPlaylists } from "../../api";
import Loading from "../../components/Loading";

const Playlists = ({ navigation }) => {
  const { getUser } = useContext(UserContext);
  const { userPlaylists, updateUserPlaylists } = useContext(LibraryContext);
  const [isLoading, setIsLoading] = useState(true);

  const createPlaylistButton = {
    id: 0,
    name: "Create Playlist",
    imageUrl: "",
  };
  const handlePlaylists = async () => {
    const user = await getUser();

    try {
      const response = await getUserPlaylists({ userid: user.id });

      if (response && response.data) {
        updateUserPlaylists([createPlaylistButton, ...response.data.data]);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userPlaylists.length !== 0) {
      setIsLoading(false);
    }
    handlePlaylists();
  }, []);

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader showBack={true} title="Playlists" />
      </View>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={styles.containerContent}
          data={userPlaylists}
          numColumns={2}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={gStyle.activeOpacity}
              hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              onPress={() =>
                navigation.navigate("Playlist", { playlist: item })
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
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

Playlists.propTypes = {
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
    ...gStyle.textBold12,
    color: colors.white,
    marginTop: 4,
    textAlign: "center",
  },
});

export default withNavigation(Playlists);
