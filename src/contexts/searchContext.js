import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);

  const updateGenres = (data) => {
    setGenres(data);
  };
  const storeSearchHistory = async (value) => {
    const history = await getSearchHistory();
    try {
      const jsonValue = JSON.stringify([value, ...history]);
      await AsyncStorage.setItem("searchHistory", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getSearchHistory = async () => {
    try {
      const value = await AsyncStorage.getItem("searchHistory");
      return value != null ? JSON.parse(value) : [];
    } catch (error) {
      console.log(error);
    }
  };

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (e) {
      // saving error
    }
  };

  return (
    <SearchContext.Provider
      value={{
        genres,
        updateGenres,
        getSearchHistory,
        storeSearchHistory,
        clearSearchHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
