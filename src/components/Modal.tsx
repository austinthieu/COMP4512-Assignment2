import Modal from "react-modal";
import { Heart, X, ExternalLink, HeartCrack } from "lucide-react";
import { Painting, Gallery } from '../utils/types.ts';
import toast, { Toaster } from 'react-hot-toast';

interface PaintingModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPainting: Painting | null;
  selectedGallery: Gallery | null;
  paintingFavorites: Painting[];
  setPaintingsFavorite: React.Dispatch<React.SetStateAction<Painting[]>>;
}

const PaintingModal: React.FC<PaintingModalProps> = ({ modalIsOpen, setModalIsOpen, selectedPainting, selectedGallery, favorites, setPaintingsFavorite }) => {
  if (!selectedPainting || !selectedGallery) return null;

  const closeModal = () => setModalIsOpen(false);


  const isFavorited = favorites.some(p => p.paintingId === selectedPainting.paintingId);

  const toggleFavorite = () => {
    setPaintingsFavorite(prevFavorites => {
      if (isFavorited) {
        toast.success("Removed painting from favorites", { id: "fav-toast" });
        return prevFavorites.filter(p => p.paintingId !== selectedPainting.paintingId);
      } else {
        toast.success("Added painting to favorites!", { id: "fav-toast" });
        return [...prevFavorites, selectedPainting];
      }
    });
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-40"
    >
      <Toaster />
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-4xl w-full flex flex-col md:flex-row gap-8 relative">
        {/* Top Right: Close & Favorite Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors cursor-pointer"
            aria-label="Toggle favorite"
          >
            {isFavorited ? <HeartCrack size={20} /> : <Heart size={20} />}
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

        {/* Left: Painting Image */}
        <div className="w-full md:w-2/5 flex items-center">
          <div className="relative pb-4">
            <img
              src={`./paintings/full/${selectedPainting.imageFileName}.jpg`}
              alt={selectedPainting.title}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Right: Painting Details */}
        <div className="w-full md:w-3/5 flex flex-col">
          {/* Painting Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedPainting.title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-1">
              {selectedPainting.artists.firstName} {selectedPainting.artists.lastName} • {selectedPainting.yearOfWork}
            </p>
          </div>

          {/* Painting Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-2">
            <div className="col-span-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-300">{selectedPainting.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Artwork Details</h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li><span className="font-medium">Medium:</span> {selectedPainting.medium}</li>
                <li><span className="font-medium">Dimensions:</span> {selectedPainting.width} × {selectedPainting.height}</li>
                <li><span className="font-medium">Copyright:</span> {selectedPainting.copyrightText}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Gallery Info</h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li><span className="font-medium">Name:</span> {selectedGallery.galleryName}</li>
                <li><span className="font-medium">Location:</span> {selectedGallery.galleryCity}</li>
              </ul>
            </div>
          </div>

          {/* Links */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 mt-4 flex flex-wrap gap-4">
            <a
              href={selectedGallery.galleryWebSite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Gallery Website <ExternalLink size={16} />
            </a>
            <a
              href={selectedPainting.wikiLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Wikipedia <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaintingModal;
