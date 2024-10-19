import React, { useContext, useState } from "react";
import styles from "./Header.module.scss";
import Weather from "../../sections/weather/Weather";
import { Box, Drawer, ThemeProvider } from "@mui/material";
import { theme } from "../../themes/overrides";
import { redirect, useNavigate } from "react-router";
import { categories } from "../../data/Categories";
import { CategoriesContext } from "../../context/CategoriesContext";

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

  const Menu = ({ onClose }) => {
    return (
      <div className={styles.menu}>
        <div className={styles.header}>
          <Box component="i" className="fi fi-br-cross" onClick={onClose} />
        </div>
        <div className={styles.menuItems}>
          {categories.map((element) => (
            <p className={styles.menuItem}>{element.name}</p>
          ))}
        </div>
      </div>
    );
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const { setCategory } = useContext(CategoriesContext);

  const handleCategoryClick = (category) => {
    setCategory(category.slug);
    navigate(`/${category.slug}`);
  };

  const menuElements = categories.filter((category) => category.isMenu);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
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
          {/* <img
            src="https://www.assahifa.com/wp-content/themes/assahifa/assets/images/logo.png"
            alt=""
            onClick={handleClick}
          /> */}
          <p className={styles.logo} onClick={handleClick}>
            جيم بوست
          </p>
        </div>
        <div className={styles.links}>
          {menuElements.map((element, index) => (
            <span
              className={index && styles.link}
              onClick={() => handleCategoryClick(element)}
            >
              {element.name}
            </span>
          ))}
        </div>
        <Weather />
      </div>
    </div>
  );
}
