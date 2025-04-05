import { Genre } from '../utils/types';

const GenreInfo = ({ selectedGenre }: { selectedGenre: Genre }) => {
  return (
    selectedGenre ? (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg w-full mx-auto h-fit">
        <h1 className="text-3xl font-bold text-white mb-4">{selectedGenre.genreName}</h1>
        <p className="text-lg text-gray-300 mb-4">{selectedGenre.description}</p>
        <a
          href={selectedGenre.wikiLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300"
        >
          Learn more about {selectedGenre.genreName} on Wikipedia
        </a>
      </div>
    ) : (

      <div className="bg-gray-800 flex justify-center rounded-lg p-6 shadow-lg w-full mx-auto h-fit">
        <div className="text-gray-400">Select a genre to view details</div>
      </div>
    )
  );
};

export default GenreInfo;
