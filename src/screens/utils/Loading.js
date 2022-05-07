import React from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
import { colors } from "../../constants";

const Loading = props => {
  const { loading } = props;

  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      onRequestClose={() => {
        console.log("close modal");
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            visible={loading}
            color="black"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: colors.black80
  },
  activityIndicatorWrapper: {
    backgroundColor: "#ffff",
    height: 200,
    width: 200,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});

export default Loading;
