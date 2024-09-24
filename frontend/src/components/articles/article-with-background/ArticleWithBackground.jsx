import React from "react";
import styles from "./ArticleWithBackground.module.scss";

export default function ArticleWithBackground({ article, key }) {
  const { headline, underHeadline, content, date, image, url, imagesSrcset } =
    article;

  return (
    <div
      key={key}
      className={styles.main}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${image})`,
      }}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <p className={styles.tag}>تقارير</p>
        <p className={styles.time}>23 شتنبر 2024</p>
      </div>
      <p className={styles.title}>{headline}</p>
    </div>
  );
}
