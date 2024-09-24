import React from "react";
import styles from "./SectionContainer.module.scss";

export default function SectionContainer({ children, title, style }) {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        {title && <h2>{title}</h2>}
        <hr />
      </div>
      <div style={style}>{children}</div>
    </div>
  );
}
