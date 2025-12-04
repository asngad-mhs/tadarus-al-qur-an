
import React from 'react';
import { QuranIcon } from './icons/QuranIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <QuranIcon className="w-8 h-8 text-teal-400"/>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider">
            Tadarus Al-Qur'an
          </h1>
        </div>
        <a 
          href="#surah-list"
          className="hidden sm:inline-block bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
        >
          Pilih Surah
        </a>
      </div>
    </header>
  );
};

export default Header;
