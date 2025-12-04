import React from 'react';
import { QuranIcon } from './icons/QuranIcon';
import { InstallIcon } from './icons/InstallIcon';

interface HeaderProps {
  onInstallClick: () => void;
  showInstallButton: boolean;
}

const Header: React.FC<HeaderProps> = ({ onInstallClick, showInstallButton }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <QuranIcon className="w-8 h-8 text-teal-400"/>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider">
            Tadarus Al-Qur'an
          </h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {showInstallButton && (
             <button
              onClick={onInstallClick}
              className="hidden sm:flex items-center space-x-2 bg-transparent border border-teal-500 text-teal-400 font-bold py-2 px-4 rounded-full hover:bg-teal-500 hover:text-white transition-colors duration-300"
              aria-label="Install Aplikasi"
            >
              <InstallIcon className="w-5 h-5" />
              <span>Install</span>
            </button>
          )}
          <a 
            href="#surah-list"
            className="inline-block bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            Pilih Surah
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;