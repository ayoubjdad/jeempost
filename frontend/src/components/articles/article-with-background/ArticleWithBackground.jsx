import React from "react";
import styles from "./ArticleWithBackground.module.scss";
import { categories } from "../../../data/Categories";
import {
  convertDateToArarbic,
  newsFormatDate,
} from "../../../helpers/global.helper";
import { useNavigate } from "react-router";

export default function ArticleWithBackground({ article, key }) {
  const {
    id,
    image: { src },
    headline,
    categoryId,
    createdAt,
  } = article;

  const category = categories.find((category) => category.id === categoryId);

  const formatedDate = convertDateToArarbic(createdAt);
  const linkDate = newsFormatDate(createdAt);

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/news/${linkDate}/${headline}`, { state: { article } });
  };

  return (
    <div
      key={id}
      className={styles.main}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${src})`,
      }}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <p className={styles.tag}>{category.name}</p>
        <p className={styles.time}>{formatedDate}</p>
      </div>
      <p className={styles.title} onClick={onClick}>
        {headline}
      </p>
    </div>
  );
}
