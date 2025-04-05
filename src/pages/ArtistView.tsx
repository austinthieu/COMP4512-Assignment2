import { useAppContext } from "../AppProvider";
import Header from "../components/Header";
import ItemList from "../components/ItemList";
import Footer from "../components/Footer";
import ArtistInfo from "../components/ArtistInfo";
import PaintingsList from "../components/PaintingsList";
import Modal from '../components/Modal';

export default function ArtistView() {
  const {
    artists,
    paintings,
    sortBy,
    setSortBy,
    handleSelectPainting,
    selectedArtist,
    setSelectedArtist,
    artistFavorites,
    toggleArtistFavorite,
    modalIsOpen,
    setModalIsOpen,
    selectedPainting,
    paintingFavorites,
    togglePaintingFavorite,
  } = useAppContext();


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left column - Artist List */}
          <ItemList
            items={[...artists].sort((a, b) => a.lastName.localeCompare(b.lastName))}
            selectedItem={selectedArtist}
            setSelectedItem={setSelectedArtist}
            getKey={(artist) => artist ? artist.artistId : "unknown-artist"}
            renderItem={(artist) => <span>{artist?.lastName} {artist?.firstName}</span>}
            title="Artists"
          />

          {/* Middle column - Artist Info */}
          <ArtistInfo
            selectedArtist={selectedArtist}
            artistFavorites={artistFavorites}
            toggleArtistFavorite={toggleArtistFavorite}
          />

          {/* Right column - Paintings */}
          <div className="w-1/3 bg-gray-800 rounded-lg p-4 shadow-lg">
            <PaintingsList
              paintings={paintings}
              sortBy={sortBy}
              onSortChange={(option) => setSortBy(option)}
              onSelectPainting={handleSelectPainting}
            />
          </div>
        </div>
      </main>
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

      <Footer />
    </div>
  );
}
