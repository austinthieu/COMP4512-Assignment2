import { Artists } from '../utils/types';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import toast, { Toaster } from "react-hot-toast";

const ArtistInfo = ({ selectedArtist, artistFavorites, toggleArtistFavorite }: {
  selectedArtist: Artists;
  artistFavorites: Artists[];
  toggleArtistFavorite: (artist: Artists) => void;
}) => {
  const isFavorited = selectedArtist
    ? artistFavorites.some(a => a.artistId === selectedArtist.artistId)
    : false;

  const toggleFavorite = () => {
    if (isFavorited) {
      toast.success("Removed artist from favorites", { id: `fav-toast-${selectedArtist.artistId}` });
    } else {
      toast.success("Added artist to favorites!", { id: `fav-toast-${selectedArtist.artistId}` });
    }

    toggleArtistFavorite(selectedArtist);
  };

  return (
    <div className="w-2/5 space-y-6">
      {selectedArtist ? (
        <>
          <Toaster />
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <h2 className="font-bold text-3xl mb-3">{selectedArtist.firstName} {selectedArtist.lastName}</h2>
            <p><strong>Nationality: </strong> {selectedArtist.nationality}</p>
            <p><strong>Gender: </strong> {selectedArtist.gender}</p>
            <p><strong>Years: </strong> {selectedArtist.yearOfBirth} - {selectedArtist.yearOfDeath}</p>
            <p><strong>Details: </strong> {selectedArtist.details}</p>
            <p>
              <a
                href={selectedArtist.artistLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300"
              >
                Learn more
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
            <img
              src={`./artists/full/${selectedArtist.artistId}.jpg`}
              alt={`${selectedArtist.firstName} ${selectedArtist.lastName}`}
              className="mt-4 w-full h-full object-cover rounded-xl shadow-lg border-2 border-gray-700"
            />
          </div>

        </>
      ) : (
        <div className="bg-gray-800 rounded-lg p-4 h-64 shadow-lg flex items-center justify-center">
          <p className="text-gray-400">Select an artist to view details</p>
        </div>
      )}
    </div>
  );
};

export default ArtistInfo;
