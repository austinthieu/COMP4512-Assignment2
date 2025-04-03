import { FaSpinner } from "react-icons/fa";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="text-white text-xl flex flex-col items-center">
        <FaSpinner className="animate-spin text-4xl mb-4" />
        <p>Loading...</p>
      </div>
    </div>
  );
}
