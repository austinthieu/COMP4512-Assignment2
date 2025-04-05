import { Delete } from "lucide-react";

interface FavoritesGridProps {
  galleryFavorites: { galleryId: string; galleryName: string }[];
  artistFavorites: { artistId: string; firstName: string; lastName: string }[];
  paintingFavorites: { paintingId: string; title: string }[];
  toggleGalleryFavorite: (gallery: { galleryId: string; galleryName: string }) => void;
  toggleArtistFavorite: (artist: { artistId: string; firstName: string; lastName: string }) => void;
  togglePaintingFavorite: (painting: { paintingId: string; title: string }) => void;
}

const FavoritesGrid: React.FC<FavoritesGridProps> = ({
  galleryFavorites,
  artistFavorites,
  paintingFavorites,
  toggleGalleryFavorite,
  toggleArtistFavorite,
  togglePaintingFavorite,
}) => {
  return (
    <div className="grid grid-cols-3 gap-8 min-h-[50vh] max-h-[65vh]">
      {/* Galleries */}
      <FavoriteSection
        title="Galleries"
        items={galleryFavorites}
        onDelete={toggleGalleryFavorite}
        itemLabel={(item) => item.galleryName}
        itemKey={(item) => item.galleryId}
      />

      {/* Artists */}
      <FavoriteSection
        title="Artists"
        items={artistFavorites}
        onDelete={toggleArtistFavorite}
        itemLabel={(item) => `${item.firstName} ${item.lastName}`}
        itemKey={(item) => item.artistId}
      />

      {/* Paintings */}
      <FavoriteSection
        title="Paintings"
        items={paintingFavorites}
        onDelete={togglePaintingFavorite}
        itemLabel={(item) => item.title}
        itemKey={(item) => item.paintingId}
      />
    </div>
  );
};

interface FavoriteSectionProps<T> {
  title: string;
  items: T[];
  onDelete: (item: T) => void;
  itemLabel: (item: T) => string;
  itemKey: (item: T) => string;
}

const FavoriteSection = <T,>({
  title,
  items,
  onDelete,
  itemLabel,
  itemKey,
}: FavoriteSectionProps<T>) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-center mb-2 text-xl font-semibold text-white">{title}</h3>
      <div className="border border-gray-400 bg-gray-700 p-4 rounded-lg flex-1  shadow-md">
        {items.length > 0 ? (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={itemKey(item)} className="flex items-center justify-between p-3 rounded-lg">
                <span className="text-white font-medium truncate">{itemLabel(item)}</span>
                <button
                  onClick={() => onDelete(item)}
                  className="ml-2 px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded-lg shadow-md transition duration-300 text-sm cursor-pointer"
                >
                  <div className="flex gap-2">
                    <Delete size={20} />
                    Delete
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No {title.toLowerCase()} found.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesGrid;
