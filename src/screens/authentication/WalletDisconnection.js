import { View, Text, Button } from "react-native";
import React from "react";

const WalletDisconnection = ({ connector }) => {
  return (
    <View>
      <Text>Disconnect Your Wallet</Text>
      <Button title="Disconnect" onPress={() => connector.killSession()} />
    </View>
  );
};

export default WalletDisconnection;
