import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-community/async-storage";

const PlayingContext = createContext();

const PlayingContextProvider = ({ children }) => {
  const [currentSongData, setCurrentSongData] = useState(null);
  const [songs, setSongs] = useState([]);
  //   const songDataFormat = {
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

  return (
    <PlayingContext.Provider
      value={{
        songs,
        updateSongs,
        currentSongData,
        updateCurrentSongData,
      }}
    >
      {children}
    </PlayingContext.Provider>
  );
};

export { PlayingContext, PlayingContextProvider };
