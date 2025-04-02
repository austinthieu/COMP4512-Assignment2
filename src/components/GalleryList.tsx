import React from 'react';
import { Gallery } from '../utils/types';

interface GalleryListProps {
  galleries: Gallery[];
  selectedGallery: Gallery | null;
  setSelectedGallery: (gallery: Gallery) => void;
}

const GalleryList: React.FC<GalleryListProps> = ({ galleries, selectedGallery, setSelectedGallery }) => {
  return (
    <div className="w-1/4 bg-gray-800 rounded-lg p-4 shadow-lg">
      <h2 className="font-bold text-xl mb-4">Galleries</h2>
      <ul className="space-y-2">
        {galleries.map(gallery => (
          <li
            key={gallery.galleryId}
            className={`py-2 px-3 rounded cursor-pointer hover:bg-gray-700 ${selectedGallery?.galleryId === gallery.galleryId ? 'bg-indigo-600' : ''}`}
            onClick={() => setSelectedGallery(gallery)}
          >
            {gallery.galleryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryList;
