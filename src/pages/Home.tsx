import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/galleries');
    }, 700);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage: "url('./hero-image.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="relative w-full max-w-md px-6 py-12 mx-auto">
        <h1 className="text-center text-3xl font-bold text-white mb-8">Welcome to the Art Gallery</h1>
        <div className="backdrop-blur-sm bg-black/60 rounded-xl shadow-2xl p-8 border border-gray-700">
          <h2 className="text-center text-2xl font-bold text-gray-100">Sign in to your account</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-gray-100 rounded-md"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-gray-100 rounded-md"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
