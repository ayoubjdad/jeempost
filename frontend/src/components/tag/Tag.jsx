import React from "react";
import styles from "./Tag.module.scss";

export default function Tag({ title }) {
  return (
    <>
      <div className={styles.outlined}>{title}</div>
      {/* <div className={styles.contained}>{title}</div> */}
    </>
  );
}
