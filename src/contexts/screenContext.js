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
  const [toggleTabBar, setToggleTabBar] = useState(false);

  const updateCurrentSongDate = (data) => {
    setCurrentSongData(data);
  };

  const updateToggleTabBar = () => {
    setToggleTabBar(!toggleTabBar);
  };

  return (
    <ScreenContext.Provider
      value={{
        currentSongData,
        updateCurrentSongDate,
        toggleTabBar,
        updateToggleTabBar,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};

export { ScreenContext, ScreenContextProvider };
