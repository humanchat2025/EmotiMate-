// src/app/page.jsx – Landing Page EmotiMate (jasny, estetyczny)

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
        EmotiMate
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-8">
        Czasem wystarczy jedno zdanie, by poczuć się mniej samotnym. EmotiMate to emocjonalny czat wspierający, gotowy by Cię wysłuchać – 24/7. Bez oceny. Z empatią.
      </p>

      <Link href="/demo">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all shadow-lg">
          Porozmawiaj z Milą
        </button>
      </Link>

      <footer className="mt-20 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} EmotiMate. Stworzone z empatią.
      </footer>
    </main>
  );
}