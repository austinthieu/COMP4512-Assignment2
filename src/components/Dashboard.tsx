interface DashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoritesCount: number;
}

export default function Dashboard({ activeTab, setActiveTab, favoritesCount }: DashboardProps) {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-xl font-bold mr-6">Art Dashboard</div>
            <h1 className="text-lg">Gallery View</h1>
          </div>
          <div className="flex space-x-2">
            {["artists", "paintings", "galleries", "genres", "favorites", "about"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1 rounded transition 
                  ${activeTab === tab ? "bg-indigo-600 hover:bg-indigo-500" :
                    tab === "favorites" && favoritesCount === 0
                      ? "bg-gray-500 opacity-50 cursor-not-allowed"
                      : "bg-gray-700 hover:bg-gray-600 hover:cursor-pointer"}`}
                disabled={tab === "favorites" && favoritesCount === 0}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
