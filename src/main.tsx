import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import GalleryView from "./pages/GalleryView";
import Home from "./pages/Home";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galleries" element={<GalleryView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
