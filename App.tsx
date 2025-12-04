import React, { useState, useEffect } from 'react';
import { Surah } from './types';
import { getSurahs } from './services/quranService';
import Header from './components/Header';
import Hero from './components/Hero';
import SurahList from './components/SurahList';
import Player from './components/Player';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Definisikan tipe untuk event kustom
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed',
    platform: string,
  }>;
  prompt(): Promise<void>;
}

const App: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    setDeferredPrompt(null);
  };

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        setIsLoading(true);
        const data = await getSurahs();
        setSurahs(data);
        setError(null);
      } catch (err) {
        setError('Gagal memuat Surah. Silakan coba lagi nanti.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  const handleSelectSurah = (surah: Surah) => {
    setCurrentSurah(surah);
  };
  
  const handleNext = () => {
    if (!currentSurah) return;
    const currentIndex = surahs.findIndex(s => s.number === currentSurah.number);
    if (currentIndex < surahs.length - 1) {
      setCurrentSurah(surahs[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (!currentSurah) return;
    const currentIndex = surahs.findIndex(s => s.number === currentSurah.number);
    if (currentIndex > 0) {
      setCurrentSurah(surahs[currentIndex - 1]);
    }
  };
  
  const filteredSurahs = surahs.filter(surah =>
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.name.includes(searchQuery) ||
    surah.number.toString().includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Header onInstallClick={handleInstallClick} showInstallButton={!!deferredPrompt} />
      <main className="flex-grow">
        <Hero />
        <div id="surah-list" className="container mx-auto px-4 py-8 md:py-16">
            <div className="mb-8 max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Cari Surah berdasarkan nama atau nomor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 text-white transition-all duration-300"
              />
            </div>
            {isLoading ? (
                <div className="text-center">Memuat Surah...</div>
            ) : error ? (
                <div className="text-center text-red-400">{error}</div>
            ) : (
                <SurahList surahs={filteredSurahs} onSurahSelect={handleSelectSurah} currentSurahNumber={currentSurah?.number} />
            )}
        </div>
        <Contact />
      </main>
      {currentSurah && (
        <Player 
          surah={currentSurah} 
          onNext={handleNext} 
          onPrev={handlePrev} 
          isLastSurah={currentSurah.number === 114}
          isFirstSurah={currentSurah.number === 1}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;