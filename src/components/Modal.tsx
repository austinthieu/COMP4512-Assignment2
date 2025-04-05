import Modal from "react-modal";
import { Heart, X, ExternalLink, HeartCrack } from "lucide-react";
import { Painting } from '../utils/types.ts';
import toast, { Toaster } from 'react-hot-toast';

interface PaintingModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPainting: Painting | null;
  favorites: Painting[];
  setPaintingsFavorite: React.Dispatch<React.SetStateAction<Painting[]>>;
}

const PaintingModal: React.FC<PaintingModalProps> = ({ modalIsOpen, setModalIsOpen, selectedPainting, favorites, setPaintingsFavorite }) => {
  if (!selectedPainting) return null;

  const closeModal = () => setModalIsOpen(false);

  // Had to parse into object so we can map over the colors
  const parsedAnnotations = selectedPainting.jsonAnnotations ? JSON.parse(selectedPainting.jsonAnnotations) : null;

  const isFavorited = favorites.some(p => p.paintingId === selectedPainting.paintingId);

  const toggleFavorite = () => {
    if (isFavorited) {
      toast.success("Removed painting from favorites", { id: `fav-toast-${selectedPainting.paintingId}` });
    } else {
      toast.success("Added painting to favorites!", { id: `fav-toast-${selectedPainting.paintingId}` });
    }

    setPaintingsFavorite(selectedPainting);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-40"
    >
      <Toaster />
      <div className="bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full relative">
        {/* Header with buttons */}
        <div className="flex justify-end p-4">
          {/* Buttons container */}
          <div className="flex gap-2">
            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-400 transition-colors cursor-pointer"
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
        </div>

        {/* Content area */}
        <div className="p-4 pt-0 flex flex-col md:flex-row gap-8">
          {/* Left: Painting Image */}
          <div className="w-full md:w-2/5 flex items-center">
            <div className="relative pb-4">
              <img
                src={`./paintings/full/${String(selectedPainting.imageFileName).padStart(6, '0')}.jpg`}
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
              {selectedPainting.description &&
                <div className="col-span-2 mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300 max-h-84 overflow-y-auto">
                    {selectedPainting.description}
                  </p>
                </div>
              }
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
                  <li><span className="font-medium">Name:</span> {selectedPainting.galleries.galleryName}</li>
                  <li><span className="font-medium">Location:</span> {selectedPainting.galleries.galleryCity}</li>
                </ul>
              </div>
              <div className="flex gap-2 mt-2">
                {parsedAnnotations && parsedAnnotations.dominantColors.map((color) => (
                  <div
                    key={color.web}
                    className="w-12 h-12 rounded-sm"
                    style={{ backgroundColor: color.web }}
                    title={color.name}
                  ></div>
                ))}
              </div>

            </div>

            {/* Links */}
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 mt-4 flex flex-wrap gap-4">
              {selectedPainting.galleries.galleryWebSite && <a
                href={selectedPainting.galleries.galleryWebSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Gallery Website <ExternalLink size={16} />
              </a>}
              {selectedPainting.wikiLink && <a
                href={selectedPainting.wikiLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Wikipedia <ExternalLink size={16} />
              </a>}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaintingModal;
