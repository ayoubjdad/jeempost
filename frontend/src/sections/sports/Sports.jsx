import React, { useContext } from "react";
import styles from "./Sports.module.scss";
import SectionContainer from "../section-container/SectionContainer";
import Game from "../../components/games/game/Game";
import MainArticle from "../../components/articles/main-article/MainArticle";
import Standings from "./standings/Standings";
import { DataContext } from "../../context/DataProvider";

export default function Sports({ articles }) {
  const { games } = useContext(DataContext);

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
