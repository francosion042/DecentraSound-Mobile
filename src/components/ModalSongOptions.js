import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { LibraryContext } from "../contexts";

// components
import LineItemCategory from "./LineItemCategory";

// mock data
import menuSongMoreOptions from "../mockdata/menuSongMoreOptions.json";
import { colors, gStyle } from "../constants";

const ModalSongOptions = ({ songData }) => {
  const {
    songOptionsModalVisible,
    toggleSongOptionsModalVisible,
    clickedSong,
  } = useContext(LibraryContext);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={songOptionsModalVisible}
      onRequestClose={() => {
        // this.closeButtonFunction()
      }}
    >
      <View style={styles.overlayContainer} />
      <View style={styles.wraperContainer}>
        <View style={{ ...gStyle.flex1 }}>
          <View style={styles.container}>
            <Image
              source={
                clickedSong.image
                  ? { uri: clickedSong.image }
                  : require("../../assets/icon.png")
              }
              style={styles.image}
            />
            <TouchableOpacity
              activeOpacity={gStyle.activeOpacity}
              onPress={() => {}}
              style={{ ...gStyle.flex5 }}
            >
              <Text style={styles.title} numberOfLines={1}>
                {clickedSong.title}
              </Text>
              <View style={gStyle.flexRow}>
                <Text style={styles.artist}>{clickedSong.artist}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {Object.keys(menuSongMoreOptions).map((index) => {
            const item = menuSongMoreOptions[index];

            return (
              <LineItemCategory
                key={item.id}
                disableRightSide
                icon={item.icon}
                iconLibrary={item.lib}
                onPress={() => null}
                title={item.title}
              />
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            toggleSongOptionsModalVisible();
          }}
        >
          <View style={styles.containerButton}>
            <Text style={styles.buttonText}>Close</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    height: "60%",
    backgroundColor: colors.black70,
  },
  wraperContainer: {
    height: "40%",
    marginTop: "auto",
    backgroundColor: colors.grey,
    display: "flex",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    width: "100%",
    borderBottomColor: colors.grey3,
    borderBottomWidth: 1,
  },
  title: {
    ...gStyle.text16,
    color: colors.white,
    marginBottom: 4,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  artist: {
    ...gStyle.text10,
    color: colors.greyInactive,
  },
  itemStyle: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  containerButton: {
    ...gStyle.flexCenter,
    ...gStyle.spacer6,
    backgroundColor: colors.brandPrimary,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
  },
});

export default ModalSongOptions;
