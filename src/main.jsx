import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./styles/tailwind.css";
import "./styles/main.scss";
import App from "./App";
import ReduxProvider from "./providers/ReduxProvider";
createRoot(document.getElementById("root")).render(
  <ReduxProvider>
    <App />
  </ReduxProvider>,
);
