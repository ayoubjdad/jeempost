import React from "react";
import styles from "./Header.module.scss";
import Weather from "../../sections/weather/Weather";

const links = ["المغرب", "فن", , "اقتصاد", "رياضة", "تقارير", "سياحة", "فيديو"];
export default function Header() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <i class="fi fi-rr-bars-staggered" />
          <img
            src="https://www.assahifa.com/wp-content/themes/assahifa/assets/images/logo.png"
            alt=""
          />
        </div>
        <div className={styles.links}>
          {links.map((element, index) => (
            <span className={index && styles.link}>{element}</span>
          ))}
        </div>
        <p>
          <Weather />
        </p>
      </div>
    </div>
  );
}
