import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { BrowserRouter } from "react-router-dom";
const baseName = window.__APP_BASE__ || "/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={baseName}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
