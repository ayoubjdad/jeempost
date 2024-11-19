import React, { useContext } from "react";
import styles from "./SideArticle.module.scss";
import { newsFormatDate } from "../../../helpers/global.helper";
import { useNavigate } from "react-router";
import { serverUrl } from "../../../api/config";
import { DataContext } from "../../../context/DataProvider";

export default function SideArticle({ index, article = {} }) {
  const navigate = useNavigate();
  const { images } = useContext(DataContext);

  const {
    id,
    image: { src, srcset } = {},
    headline,
    createdAt,
  } = article || {};

  const linkDate = newsFormatDate(createdAt);
  const imageSrc = serverUrl + src;
  const displayedContent = headline
    ? headline.slice(0, 56) + (headline.length > 56 ? "..." : "")
    : "";

  const onClick = () => {
    navigate(`/news/${linkDate}/${headline}`, { state: { id } });
  };

  return (
    <div key={id || index} className={styles.main}>
      <p className={styles.index}>{index + 1}</p>
      <img
        alt={headline}
        srcSet={srcset}
        className={styles.image}
        src={imageSrc}
      />
      <p className={styles.title} onClick={onClick}>
        {displayedContent}
      </p>
    </div>
  );
}
