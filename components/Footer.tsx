
import React from 'react';
import { WhatsAppIcon, FacebookIcon, TikTokIcon, InstagramIcon, YouTubeIcon } from './icons/SocialIcons';

const Footer: React.FC = () => {
    const pageUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
    const pageTitle = encodeURIComponent("Dengarkan Al-Qur'an | Pemutar MP3 Tadarus Al-Qur'an");

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Bagikan & Terhubung</h3>
            <div className="flex justify-center items-center space-x-5">
                <a href={`https://wa.me/?text=${pageTitle}%20${pageUrl}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Bagikan di WhatsApp">
                    <WhatsAppIcon className="w-6 h-6" />
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Bagikan di Facebook">
                    <FacebookIcon className="w-6 h-6" />
                </a>
                {/* Direct sharing not supported, linking to profiles instead. Replace with your actual profile links. */}
                <a href="https://www.tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Temukan kami di TikTok">
                    <TikTokIcon className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Temukan kami di Instagram">
                    <InstagramIcon className="w-6 h-6" />
                </a>
                <a href="https://www.youtube.com/@yourchannel" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300" aria-label="Temukan kami di YouTube">
                    <YouTubeIcon className="w-6 h-6" />
                </a>
            </div>
        </div>
        <div className="text-center text-gray-500 border-t border-gray-800 pt-6">
            <p>&copy; {new Date().getFullYear()} Tadarus Al-Qur'an. Hak Cipta Dilindungi.</p>
            <p className="text-sm mt-1">Lantunan oleh Mishary Rashid Alafasy. Data dari API alquran.cloud.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
