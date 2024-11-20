import React from "react";
import styles from "./Footer.module.scss";
import { Box } from "@mui/material";
import { useNavigate, redirect } from "react-router";

export default function Footer() {
  const navigate = useNavigate();

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
            <Box
              component="i"
              onClick={() => redirect("https://web.facebook.com/")}
              className={`fi fi-brands-facebook ${styles.icon}`}
            />
            <Box
              component="i"
              onClick={() => redirect("https://web.facebook.com/")}
              className={`fi fi-brands-youtube ${styles.icon}`}
            />
            <Box
              component="i"
              onClick={() => redirect("https://web.facebook.com/")}
              className={`fi fi-brands-instagram ${styles.icon}`}
            />
            <Box
              component="i"
              onClick={() => redirect("https://web.facebook.com/")}
              className={`fi fi-brands-twitter-alt ${styles.icon}`}
            />
            <Box
              component="i"
              onClick={() => redirect("https://web.facebook.com/")}
              className={`fi fi-brands-tik-tok ${styles.icon}`}
            />
          </div>
        </div>
        <div className={styles.bottom}>
          جميع الحقوق محفوظة لموقع جيم بوست © 2024
        </div>
      </div>
    </div>
  );
}
