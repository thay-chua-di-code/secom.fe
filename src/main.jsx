import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./styles/tailwind.css";
import "./styles/main.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "react-hot-toast";
import App from "./App";
import store from "./redux/store";
import ReduxProvider from "./providers/ReduxProvider";
import { setAuthToken } from "./api/axiosClient";

// Restore token from localStorage into axios headers after hydration
const token = store.getState().auth?.token;
if (token) {
  setAuthToken(token);
}

createRoot(document.getElementById("root")).render(
  <ReduxProvider>
    <Toaster position="top-right" />
    <App />
  </ReduxProvider>,
);
