import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import GalleryInfo from '../components/GalleryInfo';
import PaintingsList from '../components/PaintingsList';
import supabase from '../utils/client';
import { Gallery, Painting, SortOption, ActiveTab } from '../utils/types';
import 'leaflet/dist/leaflet.css';

export default function GalleryView() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [favorites, setFavorites] = useState<Gallery[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [activeTab, setActiveTab] = useState<ActiveTab>('galleries');
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);

  // Fetch galleries from Supabase
  async function fetchGalleries() {
    console.log('Fetching galleries...');
    const { data, error } = await supabase.from('galleries').select('*');

    if (error) {
      console.error('Error fetching galleries:', error);
      return;
    }

    setGalleries(data);
  }

  useEffect(() => {
    fetchGalleries();
  }, []);

  // Load paintings when gallery is selected
  useEffect(() => {
    if (selectedGallery) {
      fetchPaintings(selectedGallery.galleryId);
    } else {
      setPaintings([]);
    }
  }, [selectedGallery]);

  // Fetch paintings when a gallery is selected
  async function fetchPaintings(galleryId: number) {
    console.log(`Fetching paintings for gallery ${galleryId}...`);
    const { data, error } = await supabase.from('paintings').select('*').eq('galleryId', galleryId);

    if (error) {
      console.error('Error fetching paintings:', error);
      return;
    }

    setPaintings(data);
  }

  // Sort paintings based on selected sort criteria
  const sortedPaintings = [...paintings].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'year') return a.yearOfWork - b.yearOfWork;
    return 0;
  });

  // Add or remove gallery from favorites
  const toggleFavorite = (gallery: Gallery) => {
    const id = 'galleryId' in gallery ? gallery.galleryId : (gallery as Painting).galleryId;
    if (favorites.some(fav => fav.galleryId === id)) {
      setFavorites(favorites.filter(fav => fav.galleryId !== id));
    } else {
      setFavorites([...favorites, gallery as Gallery]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} favoritesCount={favorites.length} />

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left column - Gallery List */}
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

          {/* Middle column - Gallery Info */}
          <GalleryInfo
            selectedGallery={selectedGallery}
            favorites={favorites}
            setFavorites={setFavorites}
            paintings={paintings}
          />

          {/* Right column - Paintings */}
          <div className="w-1/4 bg-gray-800 rounded-lg p-4 shadow-lg">
            <PaintingsList
              paintings={paintings}
              sortBy={sortBy}
              onSortChange={(option) => setSortBy(option)}
              onSelectPainting={(painting) => setSelectedPainting(painting)}
            />
          </div>
        </div>
      </main>

      {/* Painting Modal */}
      {selectedPainting && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedPainting.title}</h2>
              <button
                onClick={() => setSelectedPainting(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-6">
              <div className="w-1/2">
                <div className="bg-gray-700 h-64 rounded flex items-center justify-center">
                  {/* Replace with actual image */}
                  <p>Painting Image</p>
                </div>
              </div>
              <div className="w-1/2">
                <p><strong>Artist:</strong> {selectedPainting.artistId}</p>
                <p><strong>Year:</strong> {selectedPainting.yearOfWork}</p>
                <p><strong>Gallery:</strong> {galleries.find(g => g.galleryId === selectedPainting.galleryId)?.galleryName}</p>
                <button
                  onClick={() => toggleFavorite(selectedPainting)}
                  className={`mt-4 px-4 py-2 rounded flex items-center ${favorites.some(f => f.galleryId === selectedPainting.galleryId)
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                >
                  <FaHeart className="mr-2" />
                  {favorites.some(f => f.galleryId === selectedPainting.galleryId) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
