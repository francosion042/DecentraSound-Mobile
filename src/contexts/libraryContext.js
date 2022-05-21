import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-community/async-storage";

const LibraryContext = createContext();

const LibraryContextProvider = ({ children }) => {
  const [userOwnedSongs, setUserOwnedSongs] = useState([]);

  const updateUserOwnedSongs = (data) => {
    setUserOwnedSongs(data);
  };

  const resetSongData = () => {
    setUserOwnedSongs([]);
  };

  return (
    <LibraryContext.Provider
      value={{
        userOwnedSongs,
        updateUserOwnedSongs,
        resetSongData,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export { LibraryContext, LibraryContextProvider };
