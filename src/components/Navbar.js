'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-indigo-600 font-bold text-xl tracking-tight">
            EmotiMate
          </div>

          {/* Navigation */}
          <div className="flex space-x-6">
            <Link href="/">
              <span className="text-gray-700 hover:text-indigo-600 font-medium transition">Strona główna</span>
            </Link>
            <Link href="/o-nas">
              <span className="text-gray-700 hover:text-indigo-600 font-medium transition">O nas</span>
            </Link>
            <Link href="/cennik">
              <span className="text-gray-700 hover:text-indigo-600 font-medium transition">Cennik</span>
            </Link>
            <Link href="/demo">
              <span className="text-gray-700 hover:text-indigo-600 font-medium transition">Demo</span>
            </Link>
            <Link href="/kontakt">
              <span className="text-gray-700 hover:text-indigo-600 font-medium transition">Kontakt</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}