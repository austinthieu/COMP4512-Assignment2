import { Painting, SortOption } from '../types';
import { FaHeart } from 'react-icons/fa';

interface PaintingsListProps {
  paintings: Painting[];
  sortBy: SortOption;
  onSortChange: (sortOption: SortOption) => void;
  onSelectPainting: (painting: Painting) => void;
}

const PaintingsList = ({
  paintings,
  sortBy,
  onSortChange,
  onSelectPainting
}: PaintingsListProps) => {

  // Sort paintings based on selected sort criteria
  const sortedPaintings = [...paintings].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'year') return a.yearOfWork - b.yearOfWork;
    return 0;
  });

  return (
    <div className="w-full bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Paintings</h2>
        <div className="flex items-center">
          <label htmlFor="sortby" className="mr-2 text-sm">Sort by:</label>
          <select
            id="sortby"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="bg-gray-700 text-gray-100 text-sm rounded px-2 py-1"
          >
            <option value="title">Title</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>

      {sortedPaintings.length > 0 ? (
        <ul className="space-y-3">
          {sortedPaintings.map(painting => (
            <li
              key={painting.paintingId}
              className="py-2 px-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
              onClick={() => onSelectPainting(painting)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{painting.title}</p>
                  <p className="text-sm text-gray-400">{painting.artistId}, {painting.yearOfWork}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No paintings to display</p>
      )}
    </div>
  );
};

export default PaintingsList;
