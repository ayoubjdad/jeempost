import React, { useState } from "react";
import styles from "./Header.module.scss";
import Weather from "../../sections/weather/Weather";
import { Box, Drawer, ThemeProvider } from "@mui/material";
import { theme } from "../../themes/overrides";

const links = ["المغرب", "فن", , "اقتصاد", "رياضة", "تقارير", "سياحة", "فيديو"];

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const megaLinks = [
    "افتتاحية",
    "المغرب",
    "الشرق الأوسط",
    "تقارير",
    "المغرب الكبير",
    "اقتصاد",
    "سياحة",
    "رياضة",
    "دولي",
    "تحقيقات",
    "حوارات",
    "فيديو",
    "منوعات",
    "تكنولوجيا",
    "آراء",
    "بورتريه",
    "استطلاع للرأي",
    "اتصل بنا",
    "قسم الإشهار",
  ];

  const Menu = ({ onClose }) => {
    return (
      <div className={styles.menu}>
        <div className={styles.header}>
          <Box component="i" className="fi fi-br-cross" onClick={onClose} />
        </div>
        <div className={styles.menuItems}>
          {megaLinks.map((element) => (
            <p className={styles.menuItem}>{element}</p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Box
            component="i"
            className={`fi fi-rr-bars-staggered ${styles.burger}`}
            onClick={toggleDrawer(true)}
          />
          <ThemeProvider theme={theme}>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
              <Menu onClose={toggleDrawer(false)} />
            </Drawer>
          </ThemeProvider>
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
