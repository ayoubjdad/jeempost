import React from "react";
import styles from "./UrgentHeader.module.scss";

export default function UrgentHeader() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <p className={styles.urgent}>عاجل الآن</p>
        <p className={styles.title}>
          اختبار دم بسيط.. العلماء يحددون نظام إنذار مبكر للأمراض الخطيرة
        </p>
      </div>
    </div>
  );
}
