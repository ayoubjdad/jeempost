import React from "react";
import styles from "./Videos.module.scss";
import SectionContainer from "../section-container/SectionContainer";
import MainVideo from "../../components/videos/main-video/MainVideo";

export default function Videos({ articles }) {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <SectionContainer title="فيديوهات" readMore>
          <div className={styles.section}>
            {articles?.slice(0, 8)?.map((article, index) => (
              <MainVideo article={article} index={index} />
            ))}
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
