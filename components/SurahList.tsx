
import React from 'react';
import { Surah } from '../types';

interface SurahListProps {
  surahs: Surah[];
  onSurahSelect: (surah: Surah) => void;
  currentSurahNumber?: number;
}

const SurahList: React.FC<SurahListProps> = ({ surahs, onSurahSelect, currentSurahNumber }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {surahs.map((surah) => {
        const isPlaying = surah.number === currentSurahNumber;
        return (
          <div
            key={surah.number}
            onClick={() => onSurahSelect(surah)}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-between group ${
              isPlaying 
                ? 'bg-teal-600/30 ring-2 ring-teal-500' 
                : 'bg-gray-800 hover:bg-gray-700 hover:scale-[1.02]'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300 ${
                isPlaying ? 'bg-teal-500 text-white' : 'bg-gray-700 group-hover:bg-teal-600 text-gray-300'
              }`}>
                <span className="font-bold text-lg">{surah.number}</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{surah.englishName}</h3>
                <p className="text-sm text-gray-400">{surah.englishNameTranslation}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-arabic text-2xl text-teal-300">{surah.name}</p>
              <p className="text-xs text-gray-500">{surah.revelationType} - {surah.numberOfAyahs} Ayat</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SurahList;
