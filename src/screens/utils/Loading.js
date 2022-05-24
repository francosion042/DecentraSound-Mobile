import React from "react";
import { StyleSheet, View, Image } from "react-native";
// import { colors } from "../../constants";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/network-loading.gif")} />
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
