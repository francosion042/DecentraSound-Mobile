import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-community/async-storage";

const ExploreContext = createContext();

const ExploreContextProvider = ({ children }) => {
  const [specialAlbums, setSpecialAlbums] = useState([]);
  const [latestAlbums, setLatestAlbums] = useState([]);
  const [specialAlbumsByGenre, setSpecialAlbumsByGenre] = useState([]);
  const [albumsByBlockchain, setAlbumsByBlockchain] = useState([]);
  const [artists, setArtists] = useState([]);
  const [filterOptionsModalVisible, setFilterOptionsModalVisible] =
    useState(false);

  const updateSpecialAlbums = (data) => {
    setSpecialAlbums(data);
  };

  const updateSpecialAlbumsByGenres = (data) => {
    setSpecialAlbumsByGenre(data);
  };

  const updateLatestAlbums = (data) => {
    setLatestAlbums(data);
  };

  const updateAlbumsByBlockchain = (data) => {
    setAlbumsByBlockchain(data);
  };

  const updateArtists = (data) => {
    setArtists(data);
  };

  const togglefilterOptionsModalVisible = () => {
    setFilterOptionsModalVisible(!filterOptionsModalVisible);
  };

  const resetSongData = () => {
    setSpecialAlbums([]);
  };

  return (
    <ExploreContext.Provider
      value={{
        specialAlbums,
        updateSpecialAlbums,
        specialAlbumsByGenre,
        updateSpecialAlbumsByGenres,
        latestAlbums,
        updateLatestAlbums,
        albumsByBlockchain,
        updateAlbumsByBlockchain,
        artists,
        updateArtists,
        resetSongData,
        filterOptionsModalVisible,
        togglefilterOptionsModalVisible,
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
};

export { ExploreContext, ExploreContextProvider };
