import React from "react";
import styles from "./SideArticle.module.scss";
import { newsFormatDate } from "../../../helpers/global.helper";
import { useNavigate } from "react-router";

export default function SideArticle({ index, article = {} }) {
  const {
    id,
    image: { src, srcset } = {},
    headline,
    createdAt,
  } = article || {};

  const navigate = useNavigate();

  const linkDate = newsFormatDate(createdAt);
  const displayedContent = headline
    ? headline.slice(0, 56) + (headline.length > 56 ? "..." : "")
    : "";

  const onClick = () => {
    navigate(`/news/${linkDate}/${headline}`, { state: { id } });
  };

  return (
    <div key={id || index} className={styles.main}>
      <p className={styles.index}>{index + 1}</p>
      <img alt={headline} srcSet={srcset} className={styles.image} src={src} />
      <p className={styles.title} onClick={onClick}>
        {displayedContent}
      </p>
    </div>
  );
}
