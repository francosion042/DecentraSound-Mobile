import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-community/async-storage";

const ScreenContext = createContext();

const ScreenContextProvider = ({ children }) => {
  const [currentSongData, setCurrentSongData] = useState(null);
  //   const songDataFormat = {
  //     album: "Swimming",
  //     artist: "Mac Miller",
  //     image: "swimming",
  //     length: 312,
  //     title: "So It Goes",
  //   };
  const [showTabBarState, setShowTabBarState] = useState(true);

  const updateCurrentSongData = (data) => {
    setCurrentSongData(data);
  };

  const updateShowTabBarState = (bool) => {
    setShowTabBarState(bool);
  };

  const resetScreenData = () => {
    setCurrentSongData(null);
    setShowTabBarState(true);
  };

  return (
    <ScreenContext.Provider
      value={{
        currentSongData,
        updateCurrentSongData,
        showTabBarState,
        updateShowTabBarState,
        resetScreenData,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};

export { ScreenContext, ScreenContextProvider };
