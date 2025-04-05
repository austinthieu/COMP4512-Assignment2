import { Painting, SortOption, Genre } from '../utils/types';

interface GenrePaintingsProps {
  paintings: Painting[];
  sortBy: SortOption;
  onSortChange: (sortOption: SortOption) => void;
  onSelectPainting: (painting: Painting) => void;
  selectedGenre?: Genre;
}

const GenrePaintings = ({
  paintings,
  sortBy,
  onSortChange,
  onSelectPainting,
  selectedGenre,
}: GenrePaintingsProps) => {
  if (!selectedGenre) return null;

  // Sort paintings based on selected sort criteria
  const sortedPaintings = [...paintings].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'year') return a.yearOfWork - b.yearOfWork;
    if (sortBy === 'lastName') return a.artists.lastName.localeCompare(b.artists.lastName);
    return 0;
  });

  return (
    <>
      {/* Sort Dropdown */}
      <div className="flex justify-end content-center mt-4 mr-6">
        <label htmlFor="sortby" className="text-gray-300 mt-2 mr-2 text-sm">
          Sort by:
        </label>
        <select
          id="sortby"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="bg-gray-700 text-gray-100 text-sm rounded px-3 py-2 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="lastName">Artist</option>
        </select>
      </div>

      {/* Paintings Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
        {sortedPaintings.map((painting) => (
          <div
            key={painting.paintingId}
            className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-600 transition-colors duration-200"
            onClick={() => onSelectPainting(painting)}
          >
            <div className="w-full aspect-square">
              <img
                src={`./paintings/square/${String(painting.imageFileName).padStart(6, '0')}.jpg`}
                alt={painting.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="font-bold text-lg mb-1 text-white">{painting.title}</h3>
              <p className="text-sm text-gray-300">
                <span className="font-medium">{painting.artists.firstName} {painting.artists.lastName}</span>
                <span className="mx-1">•</span>
                <span>{painting.yearOfWork}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GenrePaintings;
