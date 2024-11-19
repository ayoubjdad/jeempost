import React, { useContext } from "react";
import styles from "./MainArticle.module.scss";
import { categories } from "../../../data/Categories";
import {
  convertDateToArarbic,
  newsFormatDate,
} from "../../../helpers/global.helper";
import { useNavigate } from "react-router";
import { serverUrl } from "../../../api/config";
import { DataContext } from "../../../context/DataProvider";

export default function MainArticle({
  article = {},
  // key = Math.random(),
  withoutImage = false,
  withoutDate = false,
}) {
  const navigate = useNavigate();

  const { images } = useContext(DataContext);

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
  // const imageSrc = serverUrl + src;
  const imageSrc = new URL(src, serverUrl).href;

  const displayedContent =
    content?.slice(0, 100).replaceAll("<p>", "").replaceAll("</p>", "") + "...";

  const onClick = () => {
    navigate(`/news/${linkDate}/${headline}`, { state: { id } });
  };

  return (
    <div key={id} className={styles.main}>
      {!withoutImage ? (
        imageSrc ? (
          <img alt="" srcSet={srcset} className={styles.image} src={imageSrc} />
        ) : (
          <div className={styles.noSourceImage}>لا توجد صورة</div>
        )
      ) : null}
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
