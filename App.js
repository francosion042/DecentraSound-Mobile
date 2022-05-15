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
  UserContextProvider,
  ScreenContextProvider,
  UserContext,
} from "./src/contexts";
import { createUser } from "./src/api/userRequests";

const App = () => {
  const { getUser, storeUser } = useContext(UserContext);
  const connector = useWalletConnect();

  const handleUser = async () => {
    const user = await getUser();
    console.log(user);

    if (connector.connected && user === null) {
      createUser({ address: connector.accounts[0] })
        .then((response) => {
          storeUser(response.data.data);
          console.log("called");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    handleUser();
  });

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
    <UserContextProvider>
      <ScreenContextProvider>
        <App navigation={props.navigation} />
      </ScreenContextProvider>
    </UserContextProvider>
  );
};

export default withWalletConnect(app, {
  redirectUrl: Platform.OS === "web" ? window.location.origin : "https://",
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});
