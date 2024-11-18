import React, { createContext } from "react";
import { useQuery } from "react-query";
import { fetchImages, fetchNews } from "../helpers/data.helpers";

export const DataContext = createContext();

const options = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  retry: false,
};
export const DataProvider = ({ children }) => {
  const { data: news, isLoading: isNewsLoading } = useQuery(
    "news",
    fetchNews,
    options
  );

  const { data: images, isLoading: isImagesLoading } = useQuery(
    "images",
    fetchImages,
    options
  );

  return (
    <DataContext.Provider
      value={{ news, isNewsLoading, images, isImagesLoading }}
    >
      {children}
    </DataContext.Provider>
  );
};
