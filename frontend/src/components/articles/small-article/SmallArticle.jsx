import React from "react";
import styles from "./SmallArticle.module.scss";
import { categories } from "../../../data/Categories";
import {
  convertDateToArarbic,
  newsFormatDate,
} from "../../../helpers/global.helper";
import { useNavigate } from "react-router";

export default function SmallArticle({ index, article = {} }) {
  const {
    id,
    image: { src, srcset } = {},
    headline,
    categoryId,
    content,
    createdAt,
  } = article || {};

  const navigate = useNavigate();

  const formatedDate = convertDateToArarbic(createdAt);
  const linkDate = newsFormatDate(createdAt);
  const displayedContent =
    content?.slice(0, 60).replaceAll("<p>", "").replaceAll("</p>", "") + "...";

  const category =
    categories.find((category) => category.id === categoryId) || {};

  const onClick = () => {
    navigate(`/news/${linkDate}/${headline}`, { state: { article } });
  };

  return (
    <div key={id || index} className={styles.main}>
      <img alt={headline} srcSet={srcset} className={styles.image} src={src} />
      <div className={styles.text}>
        {(category?.name || formatedDate) && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {category?.name && (
              <>
                <p className={styles.tag}>{category?.name}</p>|
              </>
            )}
            {formatedDate && <p className={styles.time}>{formatedDate}</p>}
          </div>
        )}
        <p className={styles.title} onClick={onClick}>
          {headline}
        </p>
        {content && <p className={styles.description}>{displayedContent}</p>}
      </div>
    </div>
  );
}
