import React from "react";
import ReactDOM from "react-dom/client";

import { AppProviders } from "@app/providers/index.js";
import { AppRouter } from "@app/routes/AppRouter.jsx";

import "@shared/styles/tailwind.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root container missing in index.html");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </React.StrictMode>
);
