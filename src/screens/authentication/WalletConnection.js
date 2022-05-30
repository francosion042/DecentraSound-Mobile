import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { gStyle, colors } from "../../constants";

const WalletConnection = () => {
  const connector = useWalletConnect();

  return (
    <View style={gStyle.container}>
      <View style={styles.container}>
        <View style={styles.rect2}>
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.icon}
          />
        </View>
        <Text style={styles.intro}>
          Connect Your Wallet to Enjoy {"\n"} The Best Music NFTs
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
    paddingTop: "25%",
  },
  rect2: {
    width: 400,
    height: 400,
    opacity: 10,
    alignSelf: "center",
  },
  icon: {
    height: 350,
    width: 350,
    marginBottom: 20,
    alignSelf: "center",
  },
  intro: {
    ...gStyle.text16,
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 52,
  },
  button: {
    width: "50%",
    height: 40,
    backgroundColor: colors.brandPrimary,
    alignSelf: "center",
    borderRadius: 5,
    padding: 5,
  },
  btnText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default WalletConnection;
