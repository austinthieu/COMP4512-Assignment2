import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import PaintingFilters from '../components/PaintingFilters';
import PaintingsGrid from '../components/PaintingsGrid'
import Modal from '../components/Modal';
import { useAppContext } from '../AppProvider';

export default function PaintingView() {
  const {
    paintings,
    setSortBy,
    sortBy,
    handleSelectPainting,
    modalIsOpen,
    selectedPainting,
    setModalIsOpen,
    paintingFavorites,
    togglePaintingFavorite
  } = useAppContext();


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

      {/* Header */}
      <Dashboard />

      <main className="container mx-auto px-4 py-6">

        <div className="flex gap-6">
          <PaintingFilters />

          <div className="flex-col max-w-6xl">
            <PaintingsGrid paintings={paintings}
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


      < Footer />
    </div>
  )
}
