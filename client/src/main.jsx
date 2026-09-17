// ───────────────────────────────────────────────
// main.jsx  –  React entry point
// ───────────────────────────────────────────────
// This file does ONE job: mount the <App /> component into the DOM.
//
// React.StrictMode wraps the app to surface potential problems during
// development (double-renders, deprecated API warnings, etc.).
// It has zero effect in production builds.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

