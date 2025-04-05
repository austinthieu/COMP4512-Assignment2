import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import supabase from './utils/client';
import { Painting, Gallery, SortOption, Genre, Artists } from './utils/types';

interface AppState {
  // State
  galleries: Gallery[];
  paintings: Painting[] | null;
  artists: Artists[];
  allPaintings: Painting[];
  genres: Genre[];
  selectedGallery: Gallery | undefined;
  selectedPainting: Painting | undefined;
  selectedGenre: Genre | undefined;
  selectedArtist: Artists | undefined;
  galleryFavorites: Gallery[];
  paintingFavorites: Painting[];
  artistFavorites: Artists[];
  sortBy: SortOption;
  isLoading: boolean;
  modalIsOpen: boolean;
  showFavoritesModal: boolean;
  combinedFavoritesCount: number;

  // Actions
  setSelectedGallery: (gallery: Gallery | undefined) => void;
  setSelectedPainting: (painting: Painting | undefined) => void;
  setSelectedGenre: (genre: Genre | undefined) => void;
  setPaintings: (painting: Painting[]) => void;
  setSelectedArtist: (artist: Artists | undefined) => void;
  setSortBy: (sortOption: SortOption) => void;
  setModalIsOpen: (isOpen: boolean) => void;
  setShowFavoritesModal: (show: boolean) => void;
  setPaintingFavorites: (paintings: Painting[]) => void;
  setGalleryFavorites: (galleries: Gallery[]) => void;
  setArtistFavorites: (artists: Artists[]) => void;
  handleSelectPainting: (painting: Painting) => void;
  toggleGalleryFavorite: (gallery: Gallery) => void;
  togglePaintingFavorite: (painting: Painting) => void;
  toggleArtistFavorite: (artist: Artists) => void;
  clearAllFavorites: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [artists, setArtists] = useState<Artists[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | undefined>(undefined);
  const [selectedPainting, setSelectedPainting] = useState<Painting | undefined>(undefined);
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>(undefined);
  const [selectedArtist, setSelectedArtist] = useState<Artists | undefined>(undefined);
  const [allPaintings, setAllPaintings] = useState<Painting[]>([]);
  const [galleryFavorites, setGalleryFavorites] = useState<Gallery[]>([]);
  const [paintingFavorites, setPaintingFavorites] = useState<Painting[]>([]);
  const [artistFavorites, setArtistFavorites] = useState<Artists[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('title');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const location = useLocation();

  const combinedFavoritesCount = galleryFavorites.length + paintingFavorites.length + artistFavorites.length;

  // Fetch galleries
  useEffect(() => {
    const fetchGalleries = async () => {
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

  // Fetch paintings
  useEffect(() => {
    const fetchAllPaintings = async () => {
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

  // Fetch artists
  useEffect(() => {
    const fetchArtists = async () => {
      setIsLoading(true);
      const localArtists = localStorage.getItem('artists');
      if (localArtists) {
        setArtists(JSON.parse(localArtists));
      } else {
        const { data, error } = await supabase.from('artists').select('*');
        if (!error && data) {
          setArtists(data);
          localStorage.setItem('artists', JSON.stringify(data));
        } else {
          console.error('Error fetching artists:', error);
        }
      }
      setIsLoading(false);
    };
    fetchArtists();
  }, []);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
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

  // Reset selections on path change
  useEffect(() => {
    setSelectedGallery(undefined);
    setSelectedGenre(undefined);
    setSelectedArtist(undefined);
    setPaintings([])
  }, [location.pathname]);

  // Handle filter by gallery, genre, artist
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
        filteredPaintings = filteredPaintings.filter(painting => painting.artistId === selectedArtist.artistId);
      }

      setPaintings(filteredPaintings);
    } else {
      setPaintings([]);
    }
  }, [selectedGallery, selectedGenre, selectedArtist, allPaintings]);

  // Load favorites from localStorage
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

  // Handle selection of painting
  const handleSelectPainting = (painting: Painting) => {
    setSelectedPainting(painting);
    setModalIsOpen(true);
  };

  // Toggle favorites actions for gallery, painting, artist
  const toggleGalleryFavorite = (gallery: Gallery) => {
    setGalleryFavorites(prevFavorites => {
      const newFavorites = prevFavorites.some(g => g.galleryId === gallery.galleryId)
        ? prevFavorites.filter(g => g.galleryId !== gallery.galleryId)
        : [...prevFavorites, gallery];

      localStorage.setItem('galleryFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const togglePaintingFavorite = (painting: Painting) => {
    setPaintingFavorites(prev => {
      const newFavorites = prev.some(p => p.paintingId === painting.paintingId)
        ? prev.filter(p => p.paintingId !== painting.paintingId)
        : [...prev, painting];

      localStorage.setItem('paintingFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const toggleArtistFavorite = (artist: Artists) => {
    setArtistFavorites(prev => {
      const newFavorites = prev.some(a => a.artistId === artist.artistId)
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
  return context!;
};

export default AppProvider;
