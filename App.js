import "react-native-gesture-handler";
import React, { Fragment, useContext, useEffect } from "react";
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
  ConnectionContextProvider,
  ScreenContextProvider,
  ConnectionContext,
} from "./src/contexts";
import { createUser } from "./src/api/userRequests";

const App = () => {
  const { updateConnection, connection } = useContext(ConnectionContext);
  const connector = useWalletConnect();

  useEffect(() => {
    updateConnection(connector);
  }, [connector, updateConnection]);

  if (connector.connected && connection === null) {
    console.log(connection);
    console.log(connector.accounts[0]);

    const response = createUser({ address: connector.accounts[0] });
    response.then((data) => console.log(data));

    console.log("got here");
  }

  if (!connector.connected) {
    return <WalletConnection />;
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
