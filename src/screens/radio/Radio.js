import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../constants";

const Radio = () => {
  return (
    <View>
      <Text style={styles.text}>Radio</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: 30,
    alignSelf: "center",
    paddingTop: "5%",
  },
});

export default Radio;
