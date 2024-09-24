import React from "react";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.text}>
            <p>اتصل بنا</p>
            <p>|</p>
            <p>قسم الإشهار</p>
          </div>
          <div className={styles.brands}>
            <i class="fi fi-brands-facebook" />
            <i class="fi fi-brands-youtube" />
            <i class="fi fi-brands-instagram" />
            <i class="fi fi-brands-twitter-alt" />
            <i class="fi fi-brands-tik-tok" />
          </div>
        </div>
        <div className={styles.bottom}>
          جميع الحقوق محفوظة لموقع الصحيفة © 2024
        </div>
      </div>
    </div>
  );
}
