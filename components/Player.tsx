
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Surah } from '../types';
import { getSurahAudioUrl } from '../services/quranService';
import { PlayIcon, PauseIcon, NextIcon, PrevIcon } from './icons/PlayerIcons';

interface PlayerProps {
  surah: Surah;
  onNext: () => void;
  onPrev: () => void;
  isLastSurah: boolean;
  isFirstSurah: boolean;
}

const Player: React.FC<PlayerProps> = ({ surah, onNext, onPrev, isLastSurah, isFirstSurah }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().catch(error => console.error("Gagal memutar audio:", error));
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };
  
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration || 0);
  };
  
  const handleProgressChange = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(progressBarRef.current?.value || 0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const audioSrc = getSurahAudioUrl(surah.number);
    if (audioRef.current) {
        if (audioRef.current.src !== audioSrc) {
            audioRef.current.src = audioSrc;
        }
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => {
              console.error("Putar otomatis audio gagal, diperlukan interaksi pengguna.", error);
              setIsPlaying(false);
          });
    }
  }, [surah]);

  useEffect(() => {
      const audio = audioRef.current;
      if (audio) {
          audio.addEventListener('timeupdate', handleTimeUpdate);
          audio.addEventListener('loadedmetadata', handleLoadedMetadata);
          audio.addEventListener('ended', onNext);

          return () => {
              audio.removeEventListener('timeupdate', handleTimeUpdate);
              audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
              audio.removeEventListener('ended', onNext);
          };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onNext]);


  return (
    <div className="sticky bottom-0 left-0 right-0 z-50 bg-gray-800/80 backdrop-blur-md border-t border-gray-700">
      <audio ref={audioRef} />
      <div className="container mx-auto p-4 flex items-center space-x-4">
        <div className="flex-shrink-0 w-1/4">
          <p className="font-bold truncate text-white">{surah.number}. {surah.englishName}</p>
          <p className="text-sm text-gray-400 truncate">{surah.englishNameTranslation}</p>
        </div>
        
        <div className="flex items-center justify-center space-x-4 flex-shrink-0">
          <button onClick={onPrev} disabled={isFirstSurah} className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <PrevIcon />
          </button>
          <button onClick={togglePlayPause} className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-500 hover:bg-teal-400 text-white transition-colors">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button onClick={onNext} disabled={isLastSurah} className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <NextIcon />
          </button>
        </div>
        
        <div className="flex items-center w-full space-x-2">
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
            <input
                ref={progressBarRef}
                type="range"
                value={currentTime}
                max={duration || 0}
                onChange={handleProgressChange}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
            <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default Player;
