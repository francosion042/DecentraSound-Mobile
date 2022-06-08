import "react-native-gesture-handler";
import React, { Fragment, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useWalletConnect,
  withWalletConnect,
} from "@walletconnect/react-native-dapp";
import { device } from "./src/constants";
import NavigationContainer from "./src/navigation/Stack";
import WalletConnection from "./src/screens/authentication/WalletConnection";
import {
  UserContext,
  UserContextProvider,
  HomeContextProvider,
  ScreenContextProvider,
  PlayingContextProvider,
  LibraryContextProvider,
  ExploreContextProvider,
  SearchContextProvider,
} from "./src/contexts";
import { createUser } from "./src/api/user";

const App = () => {
  const { getUser, storeUser } = useContext(UserContext);
  const connector = useWalletConnect();

  const handleUser = async () => {
    const user = await getUser();
    console.log(user);

    if (connector.connected && user === null) {
      try {
        const response = await createUser({ address: connector.accounts[0] });
        if (response && response.data) {
          storeUser(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleUser();
  });

  if (!connector.connected) {
    return (
      <Fragment>
        {device.iOS ? (
          <StatusBar style="light" backgroundColor="black" />
        ) : null}
        <WalletConnection />
      </Fragment>
    );
  }

  return (
    <Fragment>
      {device.iOS ? <StatusBar style="light" backgroundColor="black" /> : null}
      <NavigationContainer theme="dark" />
    </Fragment>
  );
};

const app = (props) => {
  return (
    <UserContextProvider>
      <HomeContextProvider>
        <ExploreContextProvider>
          <SearchContextProvider>
            <ScreenContextProvider>
              <LibraryContextProvider>
                <PlayingContextProvider>
                  <App navigation={props.navigation} />
                </PlayingContextProvider>
              </LibraryContextProvider>
            </ScreenContextProvider>
          </SearchContextProvider>
        </ExploreContextProvider>
      </HomeContextProvider>
    </UserContextProvider>
  );
};

export default withWalletConnect(app, {
  redirectUrl: Platform.OS === "web" ? window.location.origin : "https://",
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});
