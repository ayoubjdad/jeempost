import React from "react";
import styles from "./SideArticle.module.scss";
import { useNavigate } from "react-router";

export default function SideArticle({ article, index }) {
  const { headline } = article;

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/news/19/10/2024/${headline}`, { state: { article } });
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
