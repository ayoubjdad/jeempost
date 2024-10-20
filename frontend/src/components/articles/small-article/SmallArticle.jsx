import React from "react";
import styles from "./SmallArticle.module.scss";
import { categories } from "../../../data/Categories";
import { convertDateToArarbic } from "../../../helpers/global.helper";
import { useNavigate } from "react-router";

export default function SmallArticle({ key, article }) {
  const {
    id,
    image: { src, srcset },
    author: { name, profileUrl },
    headline,
    subHeadline,
    categoryId,
    content,
    url,
    location,
    tags,
    keywords,
    comments,
    createdAt,
    updatedAt,
  } = article;

  const category = categories.find((category) => category.id === categoryId);

  const formatedDate = convertDateToArarbic(createdAt);

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/news/19/10/2024/${headline}`, { state: { article } });
  };

  return (
    <div key={key} className={styles.main}>
      <img alt={headline} srcSet={srcset} className={styles.image} src={src} />
      <div className={styles.text}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <p className={styles.tag}>{category.name}</p>|
          <p className={styles.time}>{formatedDate}</p>
        </div>
        <p className={styles.title} onClick={onClick}>
          {headline}
        </p>
        {content && (
          <p className={styles.description}>{content?.slice(0, 60)}...</p>
        )}
      </div>
    </div>
  );
}
