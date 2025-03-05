import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, RouterProvider } from "react-router";

import "./index.css";

import router from "./routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
