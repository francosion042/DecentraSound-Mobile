import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-community/async-storage";

const PlayingContext = createContext();

const PlayingContextProvider = ({ children }) => {
  const [currentSongData, setCurrentSongData] = useState(null);
  const [repeat, setRepeat] = useState("Off"); // [Off, Track, Queue]
  const [paused, setpaused] = useState(true);
  const [playingSongs, setPlayingSongs] = useState([]);

  const updateCurrentSongData = (data) => {
    setCurrentSongData(data);
  };

  const updatePlayingSongs = (data) => {
    setPlayingSongs(data);
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
    setPlayingSongs([]);
  };

  return (
    <PlayingContext.Provider
      value={{
        playingSongs,
        updatePlayingSongs,
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
