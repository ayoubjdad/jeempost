import React from "react";
import styles from "./ReadMore.module.scss";
import { Button } from "@mui/material";

export default function ReadMore({
  text,
  startIcon,
  endIcon,
  onClick = () => {},
}) {
  return (
    <Button startIcon={startIcon} endIcon={endIcon} onClick={onClick}>
      {text}
    </Button>
  );
}
