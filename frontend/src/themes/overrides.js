import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    // * Drawer
    MuiDrawer: {
      styleOverrides: {
        paper: {
          color: "#fff",
          width: "248px",
          boxShadow: "none",
          backgroundColor: "#031a46",
        },
      },
    },

    // * Button
    MuiButton: {
      styleOverrides: {
        root: {
          gap: "8px",
          color: "#1e1d1d",
          display: "flex",
          fontSize: "12px",
          padding: "6px 12px",
          width: "fit-content",
          fontFamily: "inherit",
          backgroundColor: "#ececec",
        },
        startIcon: {
          fontSize: "16px",
          marginRight: "0px",
          marginLeft: "0px",
        },
        endIcon: {
          fontSize: "16px",
          marginRight: "0px",
          marginLeft: "0px",
        },
      },
    },

    // * TextField
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
        input: {
          fontFamily: "Alexandria",
          padding: "8px 10px",
          fontSize: "14px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiInputBase: {
      root: { padding: 0 },
    },

    // * Autocomplete
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: "100% !important",
          // backgroundColor: "lightgray",
        },
        inputRoot: {
          padding: "0px",
          "& .MuiOutlinedInput-root": {
            padding: "0px",
          },
        },
        popupIndicator: {
          // color: "blue",
        },
        paper: {
          // Style for the dropdown menu
          backgroundColor: "lightblue",
        },
        option: {
          color: "black",
          '&[aria-selected="true"]': {
            backgroundColor: "lightgreen", // Highlight selected option
          },
        },
      },
    },
  },
});
