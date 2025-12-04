
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative text-center py-20 md:py-32 px-4 bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/1600/900?blur=5&random=1')"}}>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
      <div className="relative z-10">
        <h2 className="text-5xl md:text-7xl font-arabic font-bold text-white mb-4 animate-fade-in-down">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in-up">
          Selamat datang di ruang yang tenang untuk mendengarkan Al-Qur'an. Benamkan diri Anda dalam firman ilahi dan temukan ketenangan.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="#surah-list" 
              className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              Mulai Mendengarkan
            </a>
            <a 
              href="#contact" 
              className="bg-gray-700/50 hover:bg-gray-600/70 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              Hubungi Kami
            </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
