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
    activeTab,
    setActiveTab,
    paintings,
    sortBy,
    setSortBy,
    handleSelectPainting,
    selectedPainting,
    modalIsOpen,
    setModalIsOpen,
    paintingFavorites,
    setPaintingFavorites,
    combinedFavoritesCount,
    toggleGalleryFavorite,
  } = useAppContext();


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      {isLoading && <LoadingScreen />}

      {/* Header */}
      <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} favoritesCount={combinedFavoritesCount} />

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left column - Gallery List */}
          <ItemList
            items={galleries}
            selectedItem={selectedGallery}
            setSelectedItem={setSelectedGallery}
            getKey={(gallery) => gallery.galleryId}
            renderItem={(gallery) => <span>{gallery.galleryName}</span>}
            title="Galleries"
          />

          {/* Middle column - Gallery Info */}
          {!modalIsOpen && (
            <GalleryInfo
              selectedGallery={selectedGallery}
              favorites={galleryFavorites}
              setFavorites={toggleGalleryFavorite}
            />
          )}

          {/* Right column - Paintings */}
          <div className="w-1/4 bg-gray-800 rounded-lg p-4 shadow-lg">
            <PaintingsList
              paintings={paintings}
              sortBy={sortBy}
              onSortChange={(option) => setSortBy(option)}
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
            selectedGallery={selectedGallery}
            favorites={paintingFavorites}
            setPaintingsFavorite={setPaintingFavorites}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
