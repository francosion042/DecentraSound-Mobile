/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
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
import { getUserSavedAlbums } from "../../api";

const SavedAlbums = ({ navigation }) => {
  const { getUser } = useContext(UserContext);
  const { userSavedAlbums, updateUserSavedAlbums } = useContext(LibraryContext);

  const handleSavedAlbums = async () => {
    const user = await getUser();

    try {
      const response = await getUserSavedAlbums({ userid: user.id });

      if (response && response.data) {
        const albums = response.data.data.map((savedAlbum) => savedAlbum.album);
        updateUserSavedAlbums(albums);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSavedAlbums();
  }, []);
  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader showBack={true} title="Saved Albums" />
      </View>

      <FlatList
        contentContainerStyle={styles.containerContent}
        data={userSavedAlbums}
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

SavedAlbums.propTypes = {
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

export default withNavigation(SavedAlbums);
