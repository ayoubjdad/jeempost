import React from "react";
import styles from "./MainVideo.module.scss";

export default function MainVideo({ article, index }) {
  const { headline, underHeadline, content, date, image, url, imagesSrcset } =
    article;

  return (
    <div
      key={index}
      className={styles.main}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${image})`,
      }}
    >
      {/* <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <p className={styles.tag}>تقارير</p>
        <p className={styles.time}>23 شتنبر 2024</p>
      </div> */}
      <i className={`fi fi-tr-play-circle ${styles.playIcon}`}></i>
      <p className={styles.title}>{headline}</p>
    </div>
  );
}
