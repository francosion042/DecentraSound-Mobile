import "react-native-gesture-handler";
import React, { useContext, Fragment, useEffect } from "react";
// import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useWalletConnect,
  withWalletConnect,
} from "@walletconnect/react-native-dapp";
import NavigationContainer from "./src/navigation/Stack";
import WalletConnection from "./src/screens/authentication/WalletConnection";
import {
  ConnectionContext,
  ConnectionContextProvider,
  ScreenContextProvider,
} from "./src/contexts";
import { createUser } from "./src/api";

const App = () => {
  const { updateConnection } = useContext(ConnectionContext);

  const connector = useWalletConnect();

  useEffect(() => {
    updateConnection(connector);

    if (connector.connected) {
      createUser({ address: connector.accounts[0] });
    }
  }, [updateConnection, connector]);

  if (!connector.connected) {
    return <WalletConnection connector={connector} />;
  }

  return (
    <Fragment>
      {/* <StatusBar style="light" backgroundColor="black" /> */}
      <NavigationContainer theme="dark" />
    </Fragment>
  );
};

const app = (props) => {
  return (
    <ConnectionContextProvider>
      <ScreenContextProvider>
        <App navigation={props.navigation} />
      </ScreenContextProvider>
    </ConnectionContextProvider>
  );
};

export default withWalletConnect(app, {
  redirectUrl: Platform.OS === "web" ? window.location.origin : "https://",
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});
