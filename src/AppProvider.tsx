import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import supabase from './utils/client';
import { Painting, Gallery, SortOption, Genre, Artists } from './utils/types';

interface AppState {
  // State
  galleries: Gallery[];
  paintings: Painting[];
  artists: Artists[];
  allPaintings: Painting[];
  genres: Genre[];
  selectedGallery: Gallery;
  selectedPainting: Painting;
  selectedGenre: Genre;
  selectedArtist: Artists;
  galleryFavorites: Gallery[];
  paintingFavorites: Painting[];
  artistFavorites: Artists[];
  genreFavorites: Genre[];
  sortBy: SortOption;
  isLoading: boolean;
  modalIsOpen: boolean;
  showFavoritesModal: boolean;
  combinedFavoritesCount: number;

  // Actions
  setSelectedGallery: (gallery: Gallery | undefined) => void;
  setSelectedPainting: (painting: Painting | undefined) => void;
  setSelectedGenre: (genre: Genre | undefined) => void;
  setPaintings: (painting: Painting | undefined) => void;
  setSelectedArtist: (artist: Artists | undefined) => void;
  setSortBy: (sortOption: SortOption) => void;
  setModalIsOpen: (isOpen: boolean) => void;
  setShowFavoritesModal: (show: boolean) => void;
  setPaintingFavorites: (paintings: Painting[]) => void;
  setGalleryFavorites: (galleries: Gallery[]) => void;
  setArtistsFavorites: (artists: Artists[]) => void;
  setGenreFavorites: (genres: Genre[]) => void;
  handleSelectPainting: (painting: Painting) => void;
  toggleGalleryFavorite: (gallery: Gallery) => void;
  togglePaintingFavorite: (painting: Painting) => void;
  toggleArtistFavorite: (artist: Artists) => void;
  clearAllFavorites: () => void;
}

// Create context
const AppContext = createContext<AppState | undefined>(undefined);

// Create context provider component
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [artists, setArtists] = useState<Artists[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<Gallery>();
  const [selectedPainting, setSelectedPainting] = useState<Painting>();
  const [selectedGenre, setSelectedGenre] = useState<Genre>();
  const [selectedArtist, setSelectedArtist] = useState<Artists>();
  const [allPaintings, setAllPaintings] = useState<Painting[]>([]);
  const [galleryFavorites, setGalleryFavorites] = useState<Gallery[]>([]);
  const [paintingFavorites, setPaintingFavorites] = useState<Painting[]>([]);
  const [artistFavorites, setArtistFavorites] = useState<Artists[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const location = useLocation();

  // Combined favorites count
  const combinedFavoritesCount = galleryFavorites.length + paintingFavorites.length + artistFavorites.length;

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

  // Fetch all paintings from Supabase or local storage
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
          .select('*, artists!inner(artistId, firstName, lastName), galleries!inner(galleryId, galleryName, galleryCity, galleryWebSite)');
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

  // Fetch all artists from Supabase or local storage
  useEffect(() => {
    const fetchAllPaintings = async () => {
      console.log('Fetching all artists...');
      setIsLoading(true);
      const localArtists = localStorage.getItem('artists');
      if (localArtists) {
        setArtists(JSON.parse(localArtists));
      } else {
        const { data, error } = await supabase
          .from('artists')
          .select('*');
        if (!error && data) {
          setArtists(data);
          localStorage.setItem('artists', JSON.stringify(data));
        } else {
          console.error('Error fetching artists', error);
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
        const { data, error } = await supabase.from('genres').select('*, paintinggenres!inner(*)');
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

  useEffect(() => {
    setSelectedGallery(undefined);
    setSelectedGenre(undefined);
    setSelectedArtist(undefined);
  }, [location.pathname]);

  // Load paintings for the selected Gallery/Genre/Artist
  useEffect(() => {
    if (selectedGallery || selectedGenre || selectedArtist) {
      let filteredPaintings = allPaintings;

      if (selectedGallery) {
        filteredPaintings = filteredPaintings.filter(painting => painting.galleryId === selectedGallery.galleryId);
      }

      if (selectedGenre) {
        filteredPaintings = filteredPaintings.filter(painting =>
          selectedGenre.paintinggenres.some(pg => pg.paintingId === painting.paintingId)
        );
      }

      if (selectedArtist) {
        filteredPaintings = filteredPaintings.filter(painting => painting.artistId === selectedArtist.artistId)
      }

      setPaintings(filteredPaintings);
    } else {
      setPaintings([]);
    }
  }, [selectedGallery, selectedGenre, selectedArtist, allPaintings]);

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

    const savedArtistFavorites = localStorage.getItem('artistFavorites');
    if (savedArtistFavorites) {
      setArtistFavorites(JSON.parse(savedArtistFavorites));
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
        ? prevFavorites.filter(g => g.galleryId !== gallery.galleryId)
        : [...prevFavorites, gallery];

      // Only update localStorage if the favorites actually change
      if (newFavorites !== prevFavorites) {
        localStorage.setItem('galleryFavorites', JSON.stringify(newFavorites));
      }

      return newFavorites;
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

  // Toggle painting favorite
  const toggleArtistFavorite = (artist: Artists) => {
    setArtistFavorites(prev => {
      const isCurrentlyFavorite = prev.some(a => a.artistId === artist.artistId);
      const newFavorites = isCurrentlyFavorite
        ? prev.filter(a => a.artistId !== artist.artistId)
        : [...prev, artist];

      localStorage.setItem('artistFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const clearAllFavorites = (): void => {
    setArtistFavorites([]);
    setGalleryFavorites([]);
    setPaintingFavorites([]);
  };


  return (
    <AppContext.Provider
      value={{
        // State
        galleries,
        paintings,
        artists,
        allPaintings,
        genres,
        selectedGallery,
        selectedPainting,
        selectedGenre,
        selectedArtist,
        galleryFavorites,
        paintingFavorites,
        artistFavorites,
        sortBy,
        isLoading,
        modalIsOpen,
        showFavoritesModal,
        combinedFavoritesCount,

        // Actions
        setSelectedGallery,
        setSelectedPainting,
        setSelectedArtist,
        setSelectedGenre,
        setGalleryFavorites,
        setPaintingFavorites,
        setArtistFavorites,
        setPaintings,
        setSortBy,
        setModalIsOpen,
        setShowFavoritesModal,
        handleSelectPainting,
        toggleGalleryFavorite,
        togglePaintingFavorite,
        toggleArtistFavorite,
        clearAllFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export default AppProvider;
