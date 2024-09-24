import React from "react";
import styles from "./SideArticle.module.scss";

export default function SideArticle({ article, index }) {
  const { headline, underHeadline, content, date, image, url, imagesSrcset } =
    article;

  return (
    <div key={index} className={styles.main}>
      <p className={styles.title}>{headline}</p>
    </div>
  );
}
