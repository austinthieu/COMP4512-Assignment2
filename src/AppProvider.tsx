import React, { createContext, useState, useEffect, useContext } from "react";
import supabase from './utils/client';
import { Painting, Gallery, SortOption, ActiveTab, Genre } from './utils/types';

interface AppState {
  // State
  galleries: Gallery[];
  paintings: Painting[];
  allPaintings: Painting[];
  genres: Genre[];
  selectedGallery: Gallery | undefined;
  selectedPainting: Painting | undefined;
  selectedGenre: Genre | undefined;
  galleryFavorites: Gallery[];
  paintingFavorites: Painting[];
  genreFavorites: Genre[];
  sortBy: SortOption;
  activeTab: ActiveTab;
  isLoading: boolean;
  modalIsOpen: boolean;
  combinedFavoritesCount: number;

  // Actions
  setSelectedGallery: (gallery: Gallery | undefined) => void;
  setSelectedPainting: (painting: Painting | undefined) => void;
  setSelectedGenre: (genre: Genre | undefined) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setSortBy: (sortOption: SortOption) => void;
  setModalIsOpen: (isOpen: boolean) => void;
  setPaintingFavorites: (paintings: Painting[]) => void;
  setGalleryFavorites: (galleries: Gallery[]) => void;
  setGenreFavorites: (genres: Genre[]) => void;
  handleSelectPainting: (painting: Painting) => void;
  toggleGalleryFavorite: (gallery: Gallery) => void;
  togglePaintingFavorite: (painting: Painting) => void;
}

// Create context with default values
const AppContext = createContext<AppState | undefined>(undefined);

// Create context provider component
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | undefined>(undefined);
  const [selectedPainting, setSelectedPainting] = useState<Painting | undefined>(undefined);
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>(undefined);
  const [allPaintings, setAllPaintings] = useState<Painting[]>([]);
  const [galleryFavorites, setGalleryFavorites] = useState<Gallery[]>([]);
  const [paintingFavorites, setPaintingFavorites] = useState<Painting[]>([]);
  const [genreFavorites, setGenreFavorites] = useState<Genre[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [activeTab, setActiveTab] = useState<ActiveTab>('galleries');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Combined favorites count
  const combinedFavoritesCount = galleryFavorites.length + paintingFavorites.length + genreFavorites.length;

  // Fetch galleries from Supabase or local storage
  useEffect(() => {
    const fetchGalleries = async () => {
      console.log('Fetching galleries...');
      setIsLoading(true);
      const localGalleries = localStorage.getItem('galleries');
      if (localGalleries) {
        setGalleries(JSON.parse(localGalleries));
      } else {
        const { data, error } = await supabase.from('galleries').select('*');
        if (!error && data) {
          setGalleries(data);
          localStorage.setItem('galleries', JSON.stringify(data));
        } else {
          console.error('Error fetching galleries:', error);
        }
      }
      setIsLoading(false);
    };

    fetchGalleries();
  }, []);

  // Fetch all paintings at once and store them in local storage
  useEffect(() => {
    const fetchAllPaintings = async () => {
      console.log('Fetching all paintings...');
      setIsLoading(true);
      const localPaintings = localStorage.getItem('all_paintings');
      if (localPaintings) {
        setAllPaintings(JSON.parse(localPaintings));
      } else {
        const { data, error } = await supabase
          .from('paintings')
          .select('*, artists!inner(firstName, lastName)');
        if (!error && data) {
          setAllPaintings(data);
          localStorage.setItem('all_paintings', JSON.stringify(data));
        } else {
          console.error('Error fetching paintings:', error);
        }
      }
      setIsLoading(false);
    };

    fetchAllPaintings();
  }, []);

  // Fetch genres from Supabase or local storage
  useEffect(() => {
    const fetchGenres = async () => {
      console.log('Fetching genres...');
      setIsLoading(true);
      const localGenres = localStorage.getItem('genres');
      if (localGenres) {
        setGenres(JSON.parse(localGenres));
      } else {
        const { data, error } = await supabase.from('genres').select('*');
        if (!error && data) {
          setGenres(data);
          localStorage.setItem('genres', JSON.stringify(data));
        } else {
          console.error('Error fetching genres:', error);
        }
      }
      setIsLoading(false);
    };

    fetchGenres();
  }, []);

  // Load paintings for the selected gallery
  useEffect(() => {
    if (selectedGallery) {
      const filteredPaintings = allPaintings.filter(painting => painting.galleryId === selectedGallery.galleryId);
      setPaintings(filteredPaintings);
    } else {
      setPaintings([]);
    }
  }, [selectedGallery, allPaintings]);

  // Load favorites from localStorage on first render
  useEffect(() => {
    const savedGalleryFavorites = localStorage.getItem('galleryFavorites');
    if (savedGalleryFavorites) {
      setGalleryFavorites(JSON.parse(savedGalleryFavorites));
    }

    const savedPaintingFavorites = localStorage.getItem('paintingFavorites');
    if (savedPaintingFavorites) {
      setPaintingFavorites(JSON.parse(savedPaintingFavorites));
    }
  }, []);

  // When a painting is selected, open the modal
  const handleSelectPainting = (painting: Painting) => {
    setSelectedPainting(painting);
    setModalIsOpen(true);
  };

  // Toggle gallery favorite
  const toggleGalleryFavorite = (gallery: Gallery) => {
    setGalleryFavorites(prevFavorites => {
      const isCurrentlyFavorite = prevFavorites.some(g => g.galleryId === gallery.galleryId);

      // Update the favorites list
      const newFavorites = isCurrentlyFavorite
        ? prevFavorites.filter(g => g.galleryId !== gallery.galleryId) // Remove if already a favorite
        : [...prevFavorites, gallery]; // Add to favorites if not already in the list

      // Only update localStorage if the favorites actually change
      if (newFavorites !== prevFavorites) {
        localStorage.setItem('galleryFavorites', JSON.stringify(newFavorites));
      }

      return newFavorites; // Return the new favorites list to update state
    });
  };

  // Toggle painting favorite
  const togglePaintingFavorite = (painting: Painting) => {
    setPaintingFavorites(prev => {
      const isCurrentlyFavorite = prev.some(p => p.paintingId === painting.paintingId);
      const newFavorites = isCurrentlyFavorite
        ? prev.filter(p => p.paintingId !== painting.paintingId)
        : [...prev, painting];

      localStorage.setItem('paintingFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <AppContext.Provider
      value={{
        // State
        galleries,
        paintings,
        allPaintings,
        genres,
        selectedGallery,
        selectedPainting,
        selectedGenre,
        galleryFavorites,
        paintingFavorites,
        genreFavorites,
        sortBy,
        activeTab,
        isLoading,
        modalIsOpen,
        combinedFavoritesCount,

        // Actions
        setSelectedGallery,
        setSelectedPainting,
        setSelectedGenre,
        setGalleryFavorites,
        setPaintingFavorites,
        setGenreFavorites,
        setActiveTab,
        setSortBy,
        setModalIsOpen,
        handleSelectPainting,
        toggleGalleryFavorite,
        togglePaintingFavorite
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default AppProvider;
