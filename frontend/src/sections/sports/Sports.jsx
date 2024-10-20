import React from "react";
import styles from "./Sports.module.scss";
import SectionContainer from "../section-container/SectionContainer";
import { useQuery } from "react-query";
import axios from "axios";
import { gamesUrl, standingsUrl } from "../../api/data";
import Game from "../../components/games/game/Game";
import MainArticle from "../../components/articles/main-article/MainArticle";
import Standings from "./standings/Standings";
import { tournamentsPriority } from "../../data/Tournaments";

const options = {
  refetchOnWindowFocus: false,
  retry: false,
};

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const filterGamesByPriority = (games) => {
  try {
    const newArray = [];
    for (const tour of tournamentsPriority) {
      const newGames = games.filter(
        (item) => item.tournament.uniqueTournament.id === tour.id
      );
      if (newGames?.length) {
        newArray.push(...newGames);
      }
    }

    return newArray;
  } catch (error) {
    console.error("❌", error);
    return {};
  }
};

const fetchGames = async () => {
  try {
    const url = gamesUrl + formatDate(new Date(Date.now()));
    const response = await axios.get(url);

    return filterGamesByPriority(response?.data?.events);
  } catch (error) {
    console.error("❌", error);
    return {};
  }
};

const fetchStandings = async () => {
  try {
    const response = await axios.get(standingsUrl);
    return response?.data?.standings;
  } catch (error) {
    console.error("❌", error);
    return {};
  }
};

export default function Sports({ articles }) {
  const { data: games } = useQuery("games", fetchGames, options);
  const { data: standings } = useQuery("standings", fetchStandings, options);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <SectionContainer
          title="رياضة"
          readMore
          style={{ gap: "32px", display: "grid" }}
        >
          <div className={styles.games}>
            {games?.slice(0, 6)?.map((game) => (
              <Game game={game} />
            ))}
          </div>
          <div className={styles.sections}>
            <div className={styles.rightSection}>
              <MainArticle article={articles[0]} withoutDate />
              <div className={styles.smallSection}>
                <MainArticle article={articles[4]} withoutDate />
                <MainArticle article={articles[5]} withoutDate />
              </div>
            </div>
            <div className={styles.middleSection}>
              <MainArticle article={articles?.[1]} withoutImage withoutDate />
              <hr />
              <MainArticle article={articles?.[2]} withoutImage withoutDate />
              <hr />
              <MainArticle article={articles?.[2]} withoutImage withoutDate />
            </div>
            <div className={styles.leftSection}>
              <Standings standings={standings} />
            </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
