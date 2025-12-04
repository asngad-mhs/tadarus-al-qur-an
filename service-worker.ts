// FIX: Add webworker lib reference to resolve 'ServiceWorkerGlobalScope' error and simplify type assertion.
/// <reference lib="webworker" />

// Memberikan tipe pada 'self' untuk TypeScript
const sw = self;

const CACHE_NAME = 'tadarus-quran-v3';

// Daftar file yang akan di-cache.
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json',
  // Ikon PWA baru
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  // Endpoint API untuk daftar surah
  'https://api.alquran.cloud/v1/surah'
];

// Event 'install': Dipicu saat Service Worker diinstal.
sw.addEventListener('install', (event) => {
  // Menunda instalasi sampai cache terisi.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Menambahkan semua URL yang ditentukan ke dalam cache.
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch(err => {
        console.error('Failed to cache resources during install:', err);
      })
  );
});

// Event 'fetch': Dipicu setiap kali ada permintaan jaringan dari aplikasi.
sw.addEventListener('fetch', (event) => {
  // Menggunakan strategi 'cache-first'
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Jika permintaan ada di cache, kembalikan dari cache.
        if (response) {
          return response;
        }
        // Jika tidak, lakukan permintaan jaringan.
        return fetch(event.request).then(
          (networkResponse) => {
            // Opsional: Anda bisa menambahkan respons jaringan ke cache di sini jika perlu.
            return networkResponse;
          }
        );
      })
  );
});

// Event 'activate': Dipicu saat Service Worker baru diaktifkan.
sw.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Hapus cache lama yang tidak ada dalam whitelist.
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});