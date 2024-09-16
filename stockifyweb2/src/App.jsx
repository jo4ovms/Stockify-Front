import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  ThemeProvider,
  Snackbar,
  Box,
  Typography,
} from "@mui/material";
import Router from "./routes/Router";
import { useRoutes } from "react-router-dom";
import { baselightTheme } from "./theme/DefaultColors";

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}

export default App;
