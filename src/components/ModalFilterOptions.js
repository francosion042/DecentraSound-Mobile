import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { ExploreContext } from "../contexts";

// components

// mock data
// import menuSongMoreOptions from "../mockdata/menuSongMoreOptions.json";
import { colors, gStyle } from "../constants";

const ModalFilterOptions = ({ songData }) => {
  const { filterOptionsModalVisible, togglefilterOptionsModalVisible } =
    useContext(ExploreContext);

  //   const handlePress = (item) => {};
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={filterOptionsModalVisible}
      onRequestClose={() => {
        // this.closeButtonFunction()
      }}
    >
      <View style={styles.wraperContainer}>
        <View style={styles.containerMain}>
          <Text>Main</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            togglefilterOptionsModalVisible();
          }}
        >
          <View style={styles.containerButton}>
            <Text style={styles.buttonText}>Apply Filter</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.overlayContainer} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    height: "70%",
    backgroundColor: colors.black50,
  },
  wraperContainer: {
    height: "30%",
    marginBottom: "auto",
    backgroundColor: colors.grey,
    display: "flex",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  containerMain: {
    flex: 1,
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

export default ModalFilterOptions;
