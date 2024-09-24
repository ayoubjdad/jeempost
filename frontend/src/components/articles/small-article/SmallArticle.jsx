import React from "react";
import styles from "./SmallArticle.module.scss";

export default function SmallArticle({
  key,
  article,
  withDescription = false,
}) {
  const { headline, underHeadline, content, date, image, url, imagesSrcset } =
    article;

  return (
    <div key={key} className={styles.main}>
      <img alt="" srcSet={imagesSrcset} className={styles.image} src={image} />
      <div className={styles.text}>
        {/* <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <p className={styles.tag}>تقارير</p>|
          <p className={styles.time}>23 شتنبر 2024</p>
        </div> */}
        <p className={styles.title}>{headline}</p>
        {withDescription && (
          <p className={styles.description}>{content?.slice(0, 60)}...</p>
        )}
      </div>
    </div>
  );
}
