import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-community/async-storage";

const LibraryContext = createContext();

const LibraryContextProvider = ({ children }) => {
  const [userOwnedSongs, setUserOwnedSongs] = useState([]);
  const [userLikedSongs, setUserLikedSongs] = useState([]);
  const [userSavedSongs, setUserSavedSongs] = useState([]);
  const [userSavedAlbums, setUserSavedAlbums] = useState([]);
  const [userSavedArtists, setUserSavedArtists] = useState([]);

  const updateUserOwnedSongs = (data) => {
    setUserOwnedSongs(data);
  };

  const updateUserLikedSongs = (data) => {
    setUserLikedSongs(data);
  };

  const updateUserSavedSongs = (data) => {
    setUserSavedSongs(data);
  };

  const updateUserSavedAlbums = (data) => {
    setUserSavedAlbums(data);
  };

  const updateUserSavedArtists = (data) => {
    setUserSavedArtists(data);
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
        userLikedSongs,
        updateUserLikedSongs,
        userSavedSongs,
        updateUserSavedSongs,
        userSavedAlbums,
        updateUserSavedAlbums,
        userSavedArtists,
        updateUserSavedArtists,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export { LibraryContext, LibraryContextProvider };
