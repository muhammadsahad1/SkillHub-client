import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import routers from "./routes/userRoutes.tsx";
import "./index.css"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <App>
        <RouterProvider router={routers} />
      </App>
  </React.StrictMode>
);
