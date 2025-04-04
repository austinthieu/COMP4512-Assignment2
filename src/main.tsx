import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import AppProvider from "./AppProvider";
import GalleryView from "./pages/GalleryView";
import GenreView from './pages/GenreView';
import ArtistView from './pages/ArtistView';
import Home from "./pages/Home";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galleries" element={<GalleryView />} />
          <Route path="/genres" element={<GenreView />} />
          <Route path="/artists" element={<ArtistView />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
