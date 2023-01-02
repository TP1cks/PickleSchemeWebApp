import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { PickleSchemePage } from "./PickleSchemePage";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { pickleSchemeTheme } from "./PickleSchemeTheme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={pickleSchemeTheme}>
      <CssBaseline />
      <PickleSchemePage />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
