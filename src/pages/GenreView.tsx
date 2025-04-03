import { useState, useEffect } from 'react';
import { useAppContext } from "../AppProvider";
import Dashboard from "../components/Dashboard";
import ItemList from "../components/ItemList";

export default function GenreView() {
  const {
    activeTab,
    setActiveTab,
    genres,
    selectedGenre,
    setSelectedGenre,
    combinedFavoritesCount,
  } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} favoritesCount={combinedFavoritesCount} />
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">

          {/* Left column - Painting List */}
          <ItemList
            items={genres}
            selectedItem={selectedGenre}
            setSelectedItem={setSelectedGenre}
            getKey={(genre) => genre?.genreId ?? "unknown"}
            renderItem={(genre) => <span>{genre?.genreName ?? "Untitled"}</span>}
            title="Genres"
          />
        </div>
      </main>
    </div>
  )

}
