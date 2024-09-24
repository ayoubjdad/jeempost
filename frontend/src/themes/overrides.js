import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          color: "#fff",
          width: "248px",
          backgroundColor: "#031a46",
          boxShadow: "none",
        },
      },
    },
  },
});
