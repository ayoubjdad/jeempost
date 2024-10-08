import React, { createContext, useState } from "react";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [category, setCategory] = useState(null);

  return (
    <CategoriesContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
};
