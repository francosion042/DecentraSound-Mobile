import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-community/async-storage";

const PlayingContext = createContext();

const PlayingContextProvider = ({ children }) => {
  const [currentSongData, setCurrentSongData] = useState(null);
  const [repeat, setRepeat] = useState("Off"); // [Off, Track, Queue]
  const [paused, setpaused] = useState(true);
  const [songs, setSongs] = useState([]);
  //   const songDataFormat = {
  //    tokenId: 1111,
  //     album: "Swimming",
  //     artist: "Mac Miller",
  //     image: "swimming",
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

  const toggleRepeat = () => {
    if (repeat === "Off") {
      setRepeat("Track");
    }
    if (repeat === "Track") {
      setRepeat("Queue");
    }
    if (repeat === "Queue") {
      setRepeat("Off");
    }
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
        repeat,
        toggleRepeat,
      }}
    >
      {children}
    </PlayingContext.Provider>
  );
};

export { PlayingContext, PlayingContextProvider };
