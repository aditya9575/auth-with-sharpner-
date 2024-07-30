import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import GlobalContextProvider from "./store/GlobalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </GlobalContextProvider>
);
