import React from "react";
import styles from "./MainArticle.module.scss";

export default function MainArticle({
  article = {},
  key = Math.random(),
  withoutImage = false,
  withoutDate = false,
}) {
  const { headline, underHeadline, content, date, image, url, imagesSrcset } =
    article;

  return (
    <div key={key} className={styles.main}>
      {!withoutImage && image && (
        <img
          alt=""
          srcSet={imagesSrcset}
          className={styles.image}
          src={image}
        />
      )}
      {headline && <p className={styles.title}>{headline}</p>}
      {content && (
        <p className={styles.description}>{content?.slice(0, 150)}...</p>
      )}
      {!withoutDate && date && (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <p className={styles.tag}>تقارير</p>|
          <p className={styles.time}>23 شتنبر 2024</p>
        </div>
      )}
    </div>
  );
}
