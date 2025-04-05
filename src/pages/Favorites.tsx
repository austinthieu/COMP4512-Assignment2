import { useAppContext } from "../AppProvider";
import { X } from "lucide-react";
import Modal from 'react-modal';
import FavoritesGrid from "../components/FavoritesSection";

export default function Favorites() {
  const {
    setShowFavoritesModal,
    showFavoritesModal,
    paintingFavorites,
    artistFavorites,
    galleryFavorites,
    clearAllFavorites,
    togglePaintingFavorite,
    toggleGalleryFavorite,
    toggleArtistFavorite,
  } = useAppContext();

  const closeModal = () => setShowFavoritesModal(false);

  const handleEmptyFavorites = () => {
    clearAllFavorites();
  };

  return (
    <Modal
      isOpen={showFavoritesModal}
      onRequestClose={closeModal}
      className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-40"
      contentLabel="Favorites Modal"
    >
      <div className="bg-gray-800 rounded-3xl shadow-xl max-w-6xl w-full min-h-[60vh] max-h-[90vh] overflow-y-auto relative p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-white">Favorites</h2>
          <div className="flex space-x-4">
            <button
              onClick={handleEmptyFavorites}
              className="px-6 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg shadow-md transition duration-300 text-sm cursor-pointer"
            >
              Empty Favorites
            </button>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <FavoritesGrid
          galleryFavorites={galleryFavorites}
          artistFavorites={artistFavorites}
          paintingFavorites={paintingFavorites}
          toggleGalleryFavorite={toggleGalleryFavorite}
          toggleArtistFavorite={toggleArtistFavorite}
          togglePaintingFavorite={togglePaintingFavorite}
        />

      </div>
    </Modal>
  );
}

