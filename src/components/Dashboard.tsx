import { useNavigate, useLocation } from "react-router";
import { FaPaintbrush } from "react-icons/fa6";
import { useAppContext } from "../AppProvider";
import Favorites from '../pages/Favorites';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { combinedFavoritesCount, setShowFavoritesModal } = useAppContext();

  const getCurrentPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return "Home";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const handleTabClick = (tab) => {
    if (tab === "favorites") {
      setShowFavoritesModal(true);
    } else {
      navigate(`/${tab}`);
    }
  };

  return (
    <>
      <header className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <div
              className="flex items-center space-x-6 p-4 rounded-lg"
            >
              <FaPaintbrush className="text-6xl text-indigo-600 hover:text-indigo-400 cursor-pointer" onClick={() => navigate('/')} />
              <div className="flex flex-col">
                <div className="text-2xl font-semibold">Art Dashboard Project</div>
              </div>
            </div>
            <div className="flex space-x-2">
              {["artists", "paintings", "galleries", "genres", "favorites", "about"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-1 rounded transition 
                  ${location.pathname.includes(tab) ? "bg-indigo-600 hover:bg-indigo-500" :
                      tab === "favorites" && combinedFavoritesCount === 0
                        ? "bg-gray-500 opacity-50 cursor-not-allowed"
                        : "bg-gray-700 hover:bg-gray-600 hover:cursor-pointer"}`}
                  disabled={tab === "favorites" && combinedFavoritesCount === 0}
                >
                  {tab === "favorites"
                    ? `${tab.charAt(0).toUpperCase() + tab.slice(1)} (${combinedFavoritesCount})`
                    : tab.charAt(0).toUpperCase() + tab.slice(1)
                  }
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <Favorites />
    </>
  );
}
