import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);

  return (
    <UserContext.Provider value={{ connected, setConnected }}>
      {children}
    </UserContext.Provider>
  );
};
