import { useState, useEffect } from 'react';
import { useAppContext } from "../AppProvider";
import Dashboard from "../components/Dashboard";
import ItemList from "../components/ItemList";
import GenreInfo from "../components/GenreInfo";
import GenrePaintings from '../components/GenrePaintings';
import Modal from '../components/Modal';

export default function GenreView() {
  const {
    activeTab,
    setActiveTab,
    genres,
    selectedGenre,
    setSelectedGenre,
    combinedFavoritesCount,
    paintings,
    selectedPainting,
    modalIsOpen,
    setModalIsOpen,
    paintingFavorites,
    togglePaintingFavorite,
    setSortBy,
    sortBy,
    handleSelectPainting,
  } = useAppContext();


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} favoritesCount={combinedFavoritesCount} />
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">

          {/* Left column - Painting List */}
          <ItemList
            items={genres.sort((a, b) => a.genreName.localeCompare(b.genreName))}
            selectedItem={selectedGenre}
            setSelectedItem={setSelectedGenre}
            getKey={(genre) => genre?.genreId ?? "unknown"}
            renderItem={(genre) => <span>{genre?.genreName ?? "Untitled"}</span>}
            title="Genres"
          />

          <div className="flex-col max-w-6xl">
            <GenreInfo selectedGenre={selectedGenre} />
            <GenrePaintings paintings={paintings}
              sortBy={sortBy}
              onSortChange={(option) => setSortBy(option)}
              onSelectPainting={handleSelectPainting}
              selectedGenre={selectedGenre}
            />
          </div>

          {/* Painting Modal */}
          {modalIsOpen && selectedPainting && (
            <Modal
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              selectedPainting={selectedPainting}
              favorites={paintingFavorites}
              setPaintingsFavorite={togglePaintingFavorite}
            />
          )}


        </div>
      </main >
    </div >
  )

}
