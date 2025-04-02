import { FaHeart } from 'react-icons/fa';
import GalleryMap from './GalleryMap';
import { Gallery, Painting } from '../utils/types';

const GalleryInfo = ({ selectedGallery, favorites, setFavorites, paintings }: {
  selectedGallery: Gallery;
  favorites: Gallery[];
  setFavorites: React.Dispatch<React.SetStateAction<Gallery[]>>;
  paintings: Painting[];
}) => {
  return (
    <div className="w-2/4 space-y-6">
      {selectedGallery ? (
        <>
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <h2 className="font-bold text-xl mb-3">{selectedGallery.galleryName}</h2>
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
              onClick={() => setFavorites([...favorites, ...paintings.filter(p => !favorites.some(f => f.galleryId === p.galleryId))])}
              className="mt-3 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded flex items-center"
            >
              <FaHeart className="mr-2" /> Add Favorites
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
