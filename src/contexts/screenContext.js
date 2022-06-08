import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-community/async-storage";

const ScreenContext = createContext();

const ScreenContextProvider = ({ children }) => {
  //   const songDataFormat = {
  //     album: "Swimming",
  //     artist: "Mac Miller",
  //     image: "swimming",
  //     length: 312,
  //     title: "So It Goes",
  //   };
  const [showTabBarState, setShowTabBarState] = useState(true);
  const [songOptionsModalVisible, setSongOptionsModalVisible] = useState(false);
  const [clickedSong, setClickedSong] = useState(null);

  const updateShowTabBarState = (bool) => {
    setShowTabBarState(bool);
  };

  const toggleSongOptionsModalVisible = () => {
    setSongOptionsModalVisible(!songOptionsModalVisible);
  };

  const updateClickedSong = (data) => {
    setClickedSong(data);
  };

  const resetScreenData = () => {
    setShowTabBarState(true);
  };

  return (
    <ScreenContext.Provider
      value={{
        showTabBarState,
        updateShowTabBarState,
        resetScreenData,
        songOptionsModalVisible,
        toggleSongOptionsModalVisible,
        clickedSong,
        updateClickedSong,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};

export { ScreenContext, ScreenContextProvider };
