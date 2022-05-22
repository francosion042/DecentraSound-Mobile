import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-community/async-storage";

const HomeContext = createContext();

const HomeContextProvider = ({ children }) => {
  const [trendingAlbums, setTrendingAlbums] = useState([]);
  const [trendingArtists, setTrendingArtists] = useState([]);

  const updateTrendingAlbums = (data) => {
    setTrendingAlbums(data);
  };

  const updateTrendingArtists = (data) => {
    setTrendingArtists(data);
  };

  const resetSongData = () => {
    setTrendingAlbums([]);
  };

  return (
    <HomeContext.Provider
      value={{
        trendingAlbums,
        updateTrendingAlbums,
        trendingArtists,
        updateTrendingArtists,
        resetSongData,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export { HomeContext, HomeContextProvider };
