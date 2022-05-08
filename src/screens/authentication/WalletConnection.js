import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { gStyle, colors } from "../../constants";

const WalletConnection = ({ connector }) => {
  return (
    <View style={gStyle.container}>
      <View style={styles.container}>
        <View style={styles.rect2}>
          <FontAwesome name="music" style={styles.icon} />
        </View>
        <Text style={styles.intro}>
          Welcome To DecentraSound, {"\n"}Connect Your Wallet to Enjoy The Best
          NFT Musics
        </Text>
        <TouchableOpacity
          title="Connect"
          onPress={() => connector.connect()}
          style={styles.button}
        >
          <Text style={styles.btnText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: "25%"
  },
  rect2: {
    width: 151,
    height: 139,
    opacity: 10,
    marginTop: 87,
    alignSelf: "center"
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 125,
    height: 124,
    width: 107,
    marginTop: 7,
    alignSelf: "center"
  },
  intro: {
    fontFamily: "roboto-700",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 15,
    marginTop: 52,
    alignSelf: "center",
    marginBottom: 52
  },
  button: {
    width: "50%",
    height: 40,
    backgroundColor: colors.brandPrimary,
    alignSelf: "center",
    borderRadius: 5,
    padding: 5
  },
  btnText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default WalletConnection;
