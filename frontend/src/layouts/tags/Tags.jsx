import React from "react";
import styles from "./Tags.module.scss";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Tags({ list = [], onClick = () => {} }) {
  const navigate = useNavigate();

  const handleClick = (category) => {
    try {
      if (!category) {
        return;
      }

      onClick(category);
      navigate(`/${category}`);
    } catch (err) {
      console.error("❌", err);
    }
  };

  return (
    <div className={styles.tags}>
      {list.map((category) => (
        <Chip
          key={category.name}
          variant="outlined"
          label={category.name}
          onClick={() => handleClick(category.name)}
        />
      ))}
    </div>
  );
}
