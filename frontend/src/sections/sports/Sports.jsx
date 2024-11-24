import React from "react";
import styles from "./Sports.module.scss";
import SectionContainer from "../section-container/SectionContainer";
import { useQuery } from "react-query";
import axios from "axios";
import { gamesUrl } from "../../api/data";
import Game from "../../components/games/game/Game";
import MainArticle from "../../components/articles/main-article/MainArticle";
import Standings from "./standings/Standings";
import { teamsToSkip, tournamentsPriority } from "../../data/Tournaments";

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
            {games.map((game) => (
              <Game game={game} />
            ))}
          </div>
          <div className={styles.sections}>
            <div className={styles.rightSection}>
              <div className={styles.smallSection}>
                {articles?.slice(0, 4).map((article, index) => (
                  <MainArticle key={index} article={article} withoutDate />
                ))}
              </div>
            </div>
            <div className={styles.middleSection}>
              {articles?.slice(4, 8).map((article, index) => (
                <React.Fragment key={index}>
                  <MainArticle article={article} withoutDate withoutImage />
                  <hr />
                </React.Fragment>
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
