import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { colors, device } from "../constants";

const Loading = () => {
  return (
    <View style={styles.container}>
      {/* <Image source={require("../../assets/network-loading.gif")} /> */}
      <ActivityIndicator
        size={device.iOS ? "large" : 60}
        color={colors.brandPrimary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Loading;
