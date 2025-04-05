import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import GalleryMap from './GalleryMap';
import { Gallery } from '../utils/types';
import toast, { Toaster } from "react-hot-toast";

const GalleryInfo = ({ selectedGallery, favorites, setFavorites }: {
  selectedGallery: Gallery | undefined;
  favorites: Gallery[];
  setFavorites: Function;
}) => {

  const isFavorited = selectedGallery
    ? favorites.some(g => g.galleryId === selectedGallery.galleryId)
    : false;

  const toggleFavorite = () => {
    if (isFavorited) {
      toast.success("Removed gallery from favorites", { id: `fav-toast-${selectedGallery?.galleryId}` });
    } else {
      toast.success("Added gallery to favorites!", { id: `fav-toast-${selectedGallery?.galleryId}` });
    }

    setFavorites(selectedGallery);
  };

  return (
    <div className="w-2/4 space-y-6">
      {selectedGallery ? (
        <>
          <Toaster />
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <h2 className="font-bold text-3xl mb-3">{selectedGallery.galleryName}</h2>
            <p><strong>Gallery Native Name:</strong> {selectedGallery.galleryNativeName}</p>
            <p><strong>Location:</strong> {selectedGallery.galleryAddress}, {selectedGallery.galleryCity}, {selectedGallery.galleryCountry}</p>
            <p>
              <a
                href={selectedGallery.galleryWebSite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300"
              >
                Visit Gallery Website
              </a>
            </p>
            <button
              onClick={toggleFavorite}
              className="mt-3 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded flex items-center cursor-pointer"
            >
              {isFavorited ? (
                <>
                  <FaHeartBroken className="mr-2 text-red-400" /> Remove from Favorites
                </>
              ) : (
                <>
                  <FaHeart className="mr-2 text-red-400" /> Add to Favorites
                </>
              )}
            </button>
          </div>

          {/* Gallery Map */}
          <GalleryMap
            key={selectedGallery.galleryId}
            latitude={selectedGallery.latitude}
            longitude={selectedGallery.longitude}
            name={selectedGallery.galleryName}
          />
        </>
      ) : (
        <div className="bg-gray-800 rounded-lg p-4 h-64 shadow-lg flex items-center justify-center">
          <p className="text-gray-400">Select a gallery to view details</p>
        </div>
      )}
    </div>
  );
};

export default GalleryInfo;
