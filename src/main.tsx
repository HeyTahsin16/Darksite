import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BackgroundBeamsWithCollision } from "./components/ui/background-beams-with-collision";
import { ToastContainer } from "./components";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BackgroundBeamsWithCollision className="min-h-screen w-full">
      <App />
    </BackgroundBeamsWithCollision>
    <ToastContainer />
  </React.StrictMode>
);
