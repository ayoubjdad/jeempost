import React from "react";
import styles from "./SideArticle.module.scss";
import { useNavigate } from "react-router";
import { newsFormatDate } from "../../../helpers/global.helper";

export default function SideArticle({ article, index }) {
  const { headline, createdAt } = article;

  const navigate = useNavigate();

  const linkDate = newsFormatDate(createdAt);

  const onClick = () => {
    navigate(`/news/${linkDate}/${headline}`, { state: { article } });
  };

  return (
    <div key={index} className={styles.main}>
      <p className={styles.number}>{index + 1}</p>
      <p title={headline} className={styles.title} onClick={onClick}>
        {headline}
      </p>
    </div>
  );
}
