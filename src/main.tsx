import React from "react";
import ReactDOM from "react-dom/client";
import Modal from 'react-modal'
import { BrowserRouter, Routes, Route } from "react-router";
import AppProvider from "./AppProvider";
import GalleryView from "./pages/GalleryView";
import GenreView from './pages/GenreView';
import ArtistView from './pages/ArtistView';
import PaintingView from './pages/PaintingView';
import Home from "./pages/Home";
import About from './pages/About';
import "./index.css";

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galleries" element={<GalleryView />} />
          <Route path="/genres" element={<GenreView />} />
          <Route path="/artists" element={<ArtistView />} />
          <Route path="/paintings" element={<PaintingView />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
