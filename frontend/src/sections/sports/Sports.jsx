import React from "react";
import styles from "./Sports.module.scss";
import SectionContainer from "../section-container/SectionContainer";
import { useQuery } from "react-query";
import axios from "axios";
import { gamesUrl } from "../../api/data";
import Game from "../../components/games/game/Game";
import MainArticle from "../../components/articles/main-article/MainArticle";
import Standings from "./standings/Standings";
import { tournamentsPriority } from "../../data/Tournaments";

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

const filterGamesByPriority = (games, gamesToShow) => {
  try {
    const prioritizedGames = [];
    const nonPrioritizedGames = new Set();

    const priorityIds = new Set(tournamentsPriority.map((tour) => tour.id));

    for (const game of games) {
      if (!isToday(game.startTimestamp)) continue; // Skip non-today games

      if (priorityIds.has(game.tournament.uniqueTournament.id)) {
        if (prioritizedGames.length < gamesToShow) {
          prioritizedGames.push(game);
        }
      } else if (
        nonPrioritizedGames.size <
        gamesToShow - prioritizedGames.length
      ) {
        nonPrioritizedGames.add(game);
      }

      if (prioritizedGames.length + nonPrioritizedGames.size >= gamesToShow) {
        break;
      }
    }

    return [...prioritizedGames, ...nonPrioritizedGames];
  } catch (error) {
    console.error("❌", error);
    return [];
  }
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

export default function Sports({ articles }) {
  const gamesToShow = 6;

  const { data: games = [] } = useQuery(
    "games",
    () => fetchGames(gamesToShow),
    options
  );

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <SectionContainer
          title="رياضة"
          readMore
          style={{ gap: "32px", display: "grid" }}
        >
          <div className={styles.games}>
            {games?.slice(0, gamesToShow)?.map((game) => (
              <Game game={game} />
            ))}
          </div>
          <div className={styles.sections}>
            <div className={styles.rightSection}>
              <div className={styles.smallSection}>
                {articles?.slice(0, 2).map((article) => (
                  <MainArticle article={article} withoutDate />
                ))}
              </div>
              <div className={styles.smallSection}>
                {articles?.slice(2, 2).map((article) => (
                  <MainArticle article={article} withoutDate />
                ))}
              </div>
            </div>
            <div className={styles.middleSection}>
              {articles?.slice(4, 4).map((article) => (
                <>
                  <MainArticle article={article} withoutDate />
                  <hr />
                </>
              ))}
            </div>
            <div className={styles.leftSection}>
              <Standings />
            </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
