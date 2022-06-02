import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-community/async-storage";

const ExploreContext = createContext();

const ExploreContextProvider = ({ children }) => {
  const [trendingAlbums, setTrendingAlbums] = useState([]);
  const [trendingArtists, setTrendingArtists] = useState([]);
  const [filterOptionsModalVisible, setFilterOptionsModalVisible] =
    useState(false);

  const updateTrendingAlbums = (data) => {
    setTrendingAlbums(data);
  };

  const updateTrendingArtists = (data) => {
    setTrendingArtists(data);
  };

  const togglefilterOptionsModalVisible = () => {
    setFilterOptionsModalVisible(!filterOptionsModalVisible);
  };

  const resetSongData = () => {
    setTrendingAlbums([]);
  };

  return (
    <ExploreContext.Provider
      value={{
        trendingAlbums,
        updateTrendingAlbums,
        trendingArtists,
        updateTrendingArtists,
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
