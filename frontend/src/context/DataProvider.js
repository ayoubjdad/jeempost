import React, { createContext } from "react";
import { useQuery } from "react-query";
import { fetchImages, fetchNews } from "../helpers/data.helpers";
import { teamsToSkip, tournamentsPriority } from "../data/Tournaments";
import { gamesUrl } from "../api/data";
import axios from "axios";

export const DataContext = createContext();

const options = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  retry: false,
};

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const formatTimestampToDate = (date) =>
  `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;

const isToday = (timestamp) => {
  const today = new Date();
  const gameDate = new Date(timestamp * 1000);
  return formatTimestampToDate(today) === formatTimestampToDate(gameDate);
};

const filterGamesByPriority = (games = [], gamesToShow) => {
  const priorityIds = tournamentsPriority.map((tour) => tour.id);
  const skipIds = teamsToSkip.map((team) => team.id);

  const gamesList = [];
  games.forEach((game) => {
    if (
      // * Skip games that are not today
      !isToday(game.startTimestamp) ||
      // * Skip games involving teams to skip
      skipIds.includes(game.awayTeam.id) ||
      skipIds.includes(game.homeTeam.id)
    )
      return;

    priorityIds.forEach((priorityId) => {
      if (priorityId === game.tournament.uniqueTournament.id) {
        gamesList.push(game);
      }
    });
  });

  const filteredArray = [];
  priorityIds.forEach((id) => {
    const gamesInThisLeague = gamesList.filter(
      (game) => game.tournament.uniqueTournament.id === id
    );
    gamesInThisLeague.forEach((game) => filteredArray.push(game));
  });

  return filteredArray.slice(0, gamesToShow) || [];
};

const fetchGames = async (gamesToShow) => {
  try {
    const url = gamesUrl + formatDate(new Date(Date.now()));
    const response = await axios.get(url);

    return filterGamesByPriority(response?.data?.events, gamesToShow);
  } catch (error) {
    console.error("❌", error);
    return {};
  }
};

export const DataProvider = ({ children }) => {
  const {
    data: news,
    isLoading: isNewsLoading,
    dataUpdatedAt: newsUpdatedAt,
  } = useQuery("news", fetchNews, options);

  const { data: images, isLoading: isImagesLoading } = useQuery(
    "images",
    fetchImages,
    options
  );

  const gamesToShow = 6;

  const {
    data: games = [],
    isLoading: isGamesIsLoading,
    dataUpdatedAt: gamesUpdatedAt,
  } = useQuery("games", () => fetchGames(gamesToShow), options);

  const fetched = newsUpdatedAt && !isGamesIsLoading;

  return (
    <DataContext.Provider
      value={{
        fetched,
        news,
        isNewsLoading,
        games,
        isGamesIsLoading,
        images,
        isImagesLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
