import { useAppContext } from "../AppProvider";
import Dashboard from "../components/Dashboard";
import ItemList from "../components/ItemList";
import GalleryInfo from "../components/GalleryInfo";
import PaintingsList from "../components/PaintingsList";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import LoadingScreen from '../components/LoadingScreen.tsx'

export default function GalleryView() {
  const {
    galleries,
    selectedGallery,
    setSelectedGallery,
    galleryFavorites,
    isLoading,
    paintings,
    sortBy,
    setSortBy,
    handleSelectPainting,
    selectedPainting,
    modalIsOpen,
    showFavoritesModal,
    setModalIsOpen,
    paintingFavorites,
    togglePaintingFavorite,
    toggleGalleryFavorite,
  } = useAppContext();


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      {isLoading && <LoadingScreen />}

      {/* Header */}
      <Dashboard />

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left column - Gallery List */}
          <ItemList
            items={galleries.sort((a, b) => a.galleryName.localeCompare(b.galleryName))}
            selectedItem={selectedGallery}
            setSelectedItem={setSelectedGallery}
            getKey={(gallery) => gallery?.galleryId ?? 0}
            renderItem={(gallery) => gallery ? <span>{gallery.galleryName}</span> : null}
            title="Galleries"
          />

          {/* Middle column - Gallery Info */}
          {!modalIsOpen && !showFavoritesModal && (
            <GalleryInfo
              selectedGallery={selectedGallery}
              favorites={galleryFavorites}
              setFavorites={toggleGalleryFavorite}
            />
          )}

          {/* Right column - Paintings */}
          <div className="w-1/3 bg-gray-800 rounded-lg p-4 shadow-lg">
            <PaintingsList
              paintings={paintings}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onSelectPainting={handleSelectPainting}
            />
          </div>
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
      </main>

      <Footer />
    </div>
  );
}
