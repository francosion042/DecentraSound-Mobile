import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-community/async-storage";

const PlayingContext = createContext();

const PlayingContextProvider = ({ children }) => {
  const [currentSongData, setCurrentSongData] = useState(null);
  const [paused, setpaused] = useState(true);
  const [songs, setSongs] = useState([]);
  //   const songDataFormat = {
  //    tokenId: 1111,
  //     album: "Swimming",
  //     artist: "Mac Miller",
  //     image: "swimming",
  //     length: 312,
  //     title: "So It Goes",
  //   };

  const updateCurrentSongData = (data) => {
    setCurrentSongData(data);
  };

  const updateSongs = (data) => {
    setSongs(data);
  };

  const togglePaused = () => {
    setpaused(!paused);
  };

  const resetSongData = () => {
    setCurrentSongData(null);
    setSongs([]);
  };

  return (
    <PlayingContext.Provider
      value={{
        songs,
        updateSongs,
        currentSongData,
        updateCurrentSongData,
        resetSongData,
        paused,
        togglePaused,
      }}
    >
      {children}
    </PlayingContext.Provider>
  );
};

export { PlayingContext, PlayingContextProvider };
