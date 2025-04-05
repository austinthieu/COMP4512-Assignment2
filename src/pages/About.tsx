import Header from "../components/Header";
import Footer from '../components/Footer';
import { Github, Code, Palette, Database } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-3 text-white">About This Project</h1>
            <div className="h-1 w-24 bg-indigo-500 mx-auto rounded"></div>
          </header>

          <section className="bg-gray-800 rounded-lg p-6 shadow-xl mb-8">
            <p className="mb-6 text-lg leading-relaxed">
              Hi, I'm Austin and this is a React project built with Tailwind CSS and Supabase.
              It's designed as an art gallery dashboard where you can explore a collection of paintings,
              filter by artist, gallery, title, or year, and view details about each piece.
              You can also favorite your most-loved artists, paintings, and galleries.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center">
                <div className="mr-4 mt-1 bg-indigo-600 p-2 rounded-md">
                  <Code size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Frontend</h3>
                  <p className="text-gray-300">Built with React and styled using Tailwind CSS for a responsive, modern interface.</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 mt-1 bg-indigo-600 p-2 rounded-md">
                  <Database size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Backend</h3>
                  <p className="text-gray-300">Powered by Supabase for robust data management and API integration.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-8">Project Goals</h2>
            <p className="mb-6 text-lg leading-relaxed">
              I built this project for COMP4513 with the goal of strengthening my skills with React, state management, and API integration.
              The filtering functionality, image grid, and modals are all part of making the experience
              interactive and intuitive.
            </p>

            <div className="bg-gray-700 rounded-lg p-5 border-l-4 border-indigo-500">
              <p className="italic text-lg">
                Thanks for checking out my project! Feel free to explore the gallery and test all the features.
              </p>
            </div>
          </section>

          <section className="bg-gray-800 rounded-lg p-6 shadow-xl text-center">
            <h2 className="text-2xl font-bold mb-6">Technical Stack</h2>
            <div className="flex justify-center space-x-8">
              <div className="flex flex-col items-center">
                <div className="bg-blue-600 p-3 rounded-full mb-2">
                  <Palette size={24} />
                </div>
                <span>React</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-teal-600 p-3 rounded-full mb-2">
                  <Code size={24} />
                </div>
                <span>Tailwind CSS</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-green-600 p-3 rounded-full mb-2">
                  <Database size={24} />
                </div>
                <span>Supabase</span>
              </div>
            </div>

            <div className="mt-8">
              <a href="https://github.com/austinthieu/COMP4513-Assign2" className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                <Github size={18} className="mr-2" />
                View on GitHub
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
