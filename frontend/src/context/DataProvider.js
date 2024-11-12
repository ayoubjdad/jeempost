import React, { createContext } from "react";
import { useQuery } from "react-query";
import { fetchNews } from "../helpers/data.helpers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { data: news, isLoading: isNewsLoading } = useQuery("news", fetchNews, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  return (
    <DataContext.Provider value={{ news, isNewsLoading }}>
      {children}
    </DataContext.Provider>
  );
};
