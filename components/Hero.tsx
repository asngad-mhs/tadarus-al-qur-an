import React from 'react';

const Hero: React.FC = () => {
  // Pola bintang Islami yang subtil sebagai data URI SVG.
  // Warna rgba(20, 184, 166, 0.05) adalah versi transparan dari warna teal tema.
  const backgroundPattern = `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52"%3E%3Cpath fill="rgba(20, 184, 166, 0.05)" d="M26 0 33 19 52 26 33 33 26 52 19 33 0 26 19 19z"/%3E%3C/svg%3E')`;

  return (
    <div className="relative text-center py-20 md:py-24 px-4 bg-gray-900 overflow-hidden">
      {/* Pola latar belakang yang statis dan andal */}
      <div 
        className="absolute inset-0 bg-repeat" 
        style={{ backgroundImage: backgroundPattern }}
        aria-hidden="true"
      ></div>
      {/* Lapisan penutup untuk memastikan keterbacaan teks */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
      <div className="relative z-10 container mx-auto">
        <div className="max-w-4xl mx-auto border-2 border-teal-500/20 rounded-2xl p-8 md:p-12 shadow-2xl shadow-teal-500/5">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-arabic font-bold text-white mb-4 animate-fade-in-down">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in-up">
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
    </div>
  );
};

export default Hero;