import React, { createContext, useState } from "react";
// import AsyncStorage from "@react-native-community/async-storage";

const ConnectionContext = createContext();

const ConnectionContextProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);

  const updateConnection = (connector) => {
    setConnection(connector);
  };

  return (
    <ConnectionContext.Provider value={{ connection, updateConnection }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export { ConnectionContext, ConnectionContextProvider };
