import { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';
import GalleryInfo from '../components/GalleryInfo';
import PaintingsList from '../components/PaintingsList';
import GalleryList from '../components/GalleryList.tsx';
import supabase from '../utils/client';
import { Gallery, Painting, SortOption, ActiveTab } from '../utils/types';
import 'leaflet/dist/leaflet.css';


export default function GalleryView() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [allPaintings, setAllPaintings] = useState<Painting[]>([]);
  const [galleryFavorites, setGalleryFavorites] = useState<Gallery[]>([]);
  const [paintingFavorites, setPaintingFavorites] = useState<Painting[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [activeTab, setActiveTab] = useState<ActiveTab>('galleries');
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Combined favorites count
  const combinedFavoritesCount = galleryFavorites.length + paintingFavorites.length;

  // Fetch galleries from Supabase or local storage
  async function fetchGalleries() {
    console.log('Fetching galleries...');
    setIsLoading(true);
    const localGalleries = localStorage.getItem('galleries');
    if (localGalleries) {
      setGalleries(JSON.parse(localGalleries));
      setIsLoading(false);
    } else {
      const { data, error } = await supabase.from('galleries').select('*');
      if (error) {
        console.error('Error fetching galleries:', error);
        setIsLoading(false);
        return;
      }
      setGalleries(data);
      localStorage.setItem('galleries', JSON.stringify(data));
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGalleries();
  }, []);

  // Fetch all paintings at once and store them in local storage
  async function fetchAllPaintings() {
    console.log('Fetching all paintings...');
    setIsLoading(true);
    const localPaintings = localStorage.getItem('all_paintings');
    if (localPaintings) {
      const paintingsData = JSON.parse(localPaintings)
      setAllPaintings(paintingsData);
      setIsLoading(false);
    } else {
      const { data, error } = await supabase
        .from('paintings')
        .select('*, artists!inner(*)');
      if (error) {
        console.error('Error fetching paintings:', error);
        setIsLoading(false);
        return;
      }
      setAllPaintings(data);
      localStorage.setItem('all_paintings', JSON.stringify(data));
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllPaintings();
  }, []);

  // Load paintings for the selected gallery by filtering the allPaintings
  useEffect(() => {
    if (selectedGallery) {
      const filteredPaintings = allPaintings.filter(painting => painting.galleryId === selectedGallery.galleryId);
      setPaintings(filteredPaintings);
    } else {
      setPaintings([]);
    }
  }, [selectedGallery, allPaintings]);

  // Toggle gallery favorites
  const toggleGalleryFavorite = (gallery: Gallery) => {
    if (galleryFavorites.some(fav => fav.galleryId === gallery.galleryId)) {
      setGalleryFavorites(galleryFavorites.filter(fav => fav.galleryId !== gallery.galleryId));
      toast.success("Removed from favorites!");
    } else {
      setGalleryFavorites([...galleryFavorites, gallery]);
      toast.success("Added to favorites!");
    }
  };

  // Toggle painting favorites
  const togglePaintingFavorite = (painting: Painting) => {
    if (paintingFavorites.some(fav => fav.paintingId === painting.paintingId)) {
      setPaintingFavorites(paintingFavorites.filter(fav => fav.paintingId !== painting.paintingId));
    } else {
      setPaintingFavorites([...paintingFavorites, painting]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} favoritesCount={combinedFavoritesCount} />
      {/* Show loading screen while fetching */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left column - Gallery List */}
          <GalleryList
            galleries={galleries}
            selectedGallery={selectedGallery}
            setSelectedGallery={setSelectedGallery}
          />

          {/* Middle column - Gallery Info */}
          <GalleryInfo
            selectedGallery={selectedGallery}
            favorites={galleryFavorites}
            setFavorites={setGalleryFavorites}
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
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
