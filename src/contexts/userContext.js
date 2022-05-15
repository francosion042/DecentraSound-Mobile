import React, { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const storeUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      return value != null ? JSON.parse(value) : null;
    } catch (error) {
      console.log(error);
    }
  };

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (e) {
      // saving error
    }
  };

  return (
    <UserContext.Provider value={{ getUser, storeUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
