import "react-native-gesture-handler";
import React, { useState, Fragment } from "react";
// import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useWalletConnect,
  withWalletConnect,
} from "@walletconnect/react-native-dapp";
import NavigationContainer from "./src/navigation/Stack";
import WalletConnection from "./src/screens/authentication/WalletConnection";

const App = () => {
  const [currentSongData, setCurrentSongData] = useState({
    album: "Swimming",
    artist: "Mac Miller",
    image: "swimming",
    length: 312,
    title: "So It Goes",
  });
  const [toggleTabBar, setToggleTabBar] = useState(false);

  const connector = useWalletConnect();
  if (!connector.connected) {
    return <WalletConnection connector={connector} />;
  }
  console.log(connector.accounts);
  console.log(connector.chainId);

  const changeToggleTabBar = () => {
    setToggleTabBar(!toggleTabBar);
  };

  const changeCurrentSongData = (data) => {
    setCurrentSongData(data);
  };

  return (
    <Fragment>
      {/* <StatusBar style="light" backgroundColor="black" /> */}
      <NavigationContainer
        screenProps={{
          currentSongData,
          changeSong: changeCurrentSongData,
          toggleTabBarState: toggleTabBar,
          setToggleTabBar: changeToggleTabBar,
        }}
      />
    </Fragment>
  );
};

export default withWalletConnect(App, {
  redirectUrl: Platform.OS === "web" ? window.location.origin : "https://",
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});
