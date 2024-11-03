import React from "react";
import styles from "./MainArticle.module.scss";
import { categories } from "../../../data/Categories";
import {
  convertDateToArarbic,
  newsFormatDate,
} from "../../../helpers/global.helper";
import { useNavigate } from "react-router";

export default function MainArticle({
  article = {},
  key = Math.random(),
  withoutImage = false,
  withoutDate = false,
}) {
  const navigate = useNavigate();

  const {
    id,
    image: { src, srcset } = {},
    headline,
    categoryId,
    content,
    createdAt,
  } = article || {};

  const category = categories.find((category) => category.id === categoryId);

  const formatedDate = convertDateToArarbic(createdAt);
  const linkDate = newsFormatDate(createdAt);
  const displayedContent =
    content?.slice(0, 100).replaceAll("<p>", "").replaceAll("</p>", "") + "...";

  const onClick = () => {
    navigate(`/news/${linkDate}/${headline}`, { state: { article } });
  };

  return (
    <div key={id || key} className={styles.main}>
      {!withoutImage &&
        (src ? (
          <img alt="" srcSet={srcset} className={styles.image} src={src} />
        ) : (
          <div className={styles.noSourceImage}>لا توجد صورة</div>
        ))}
      {!withoutDate && createdAt && (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <p className={styles.tag}>{category?.name}</p>|
          <p className={styles.time}>{formatedDate}</p>
        </div>
      )}
      {headline && (
        <p className={styles.title} onClick={onClick}>
          {headline}
        </p>
      )}
      {content && <p className={styles.description}>{displayedContent}</p>}
    </div>
  );
}
