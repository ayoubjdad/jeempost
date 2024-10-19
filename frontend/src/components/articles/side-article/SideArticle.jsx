import React from "react";
import styles from "./SideArticle.module.scss";

export default function SideArticle({ article, index }) {
  const { headline } = article;

  return (
    <div key={index} className={styles.main}>
      <p className={styles.number}>{index + 1}</p>
      <p className={styles.title}>{headline}</p>
    </div>
  );
}
