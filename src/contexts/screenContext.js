import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-community/async-storage";

const ScreenContext = createContext();

const ScreenContextProvider = ({ children }) => {
  const [currentSongData, setCurrentSongData] = useState({
    album: "Swimming",
    artist: "Mac Miller",
    image: "swimming",
    length: 312,
    title: "So It Goes",
  });
  const [tabBarState, setTabBar] = useState(false);

  const updateCurrentSongData = (data) => {
    setCurrentSongData(data);
  };

  const updateTabBarState = () => {
    setTabBar(!tabBarState);
  };

  return (
    <ScreenContext.Provider
      value={{
        currentSongData,
        updateCurrentSongData,
        tabBarState,
        updateTabBarState,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};

export { ScreenContext, ScreenContextProvider };
