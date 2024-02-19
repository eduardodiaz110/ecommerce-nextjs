"use client";
import { DM_Sans, Poppins } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: dmSans.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#EFFA5D",
    },
    secondary: {
      main: "#000",
    },
    success: {
      main: "#21A746",
    },
    error: {
      main: "#D91C10",
    },
    text: {
      primary: "#000000",
      secondary: "#FFFFFF",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontWeight: 500,
          fontSize: "96px",
          "@media (max-width:600px)": {
            fontSize: "16px",
          },
        },
        h2: {
          fontWeight: 400,
          fontSize: "60px",
          "@media (max-width:600px)": {
            fontSize: "14px",
          },
        },
        h3: {
          fontWeight: 400,
          fontSize: "48px",
          "@media (max-width:600px)": {
            fontSize: "12px",
          },
        },
      },
    },
  },
});
export default theme;
