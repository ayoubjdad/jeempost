import React, { useContext } from "react";
import styles from "./ArticleWithBackground.module.scss";
import { categories } from "../../../data/Categories";
import {
  convertDateToArarbic,
  newsFormatDate,
} from "../../../helpers/global.helper";
import { useNavigate } from "react-router";
import { serverUrl } from "../../../api/config";
import { DataContext } from "../../../context/DataProvider";

export default function ArticleWithBackground({ article }) {
  const navigate = useNavigate();
  const { images } = useContext(DataContext);

  const {
    id,
    image: { url, src },
    headline,
    categoryId,
    createdAt,
  } = article;

  const category = categories.find((category) => category.id === categoryId);

  const formatedDate = convertDateToArarbic(createdAt);
  const linkDate = newsFormatDate(createdAt);
  const imageSrc = url || serverUrl + src;

  const onClick = () => {
    navigate(`/news/${linkDate}/${headline}`, { state: { id } });
  };

  return (
    <div
      key={id}
      className={styles.main}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${imageSrc})`,
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
