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
          backgroundColor: "#040463",
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
        endAdornment: {
          top: "auto",
          height: "100%",
          transform: "none",
        },
        popupIndicator: {
          padding: 0,
          height: "100%",
        },
        // * Style for the dropdown menu
        paper: {
          boxShadow: "none",
          borderRadius: "4px",
          // backgroundColor: "lightblue",
          marginTop: "4px",
          border: "1px solid #0000003b !important",
        },
        option: {
          color: "black",
          fontSize: "14px",
          fontFamily: "Alexandria",
          '&[aria-selected="true"]': {
            backgroundColor: "lightgreen", // Highlight selected option
          },
        },
        listbox: {
          // list-style: none;
          // margin: 0;
          // padding: 8px 0;
          // max-height: 40vh;
          // overflow: auto;
          // position: relative;
        },
      },
    },

    // * Chip
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: "inherit", fontSize: "12px" },
      },
    },

    // * Tabs
    MuiTabs: {
      styleOverrides: {
        root: { borderBottom: "0px" },
        indicator: {
          backgroundColor: "#040463",
          height: "2px",
        },
        flexContainer: {
          justifyContent: "space-between",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          width: "40px",
          minWidth: "40px",
          padding: "8px 16px", // Adjust padding
          "&.Mui-selected": {
            // color: "#1976d2", // Color of the selected tab
          },
          "&:hover": {
            // color: "#1565c0", // Hover color
          },
        },
      },
    },
  },
});
