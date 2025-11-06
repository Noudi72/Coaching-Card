// Service Worker für Offline-Funktionalität
const CACHE_NAME = 'coaching-card-v2';
// Pfade relativ zum Repository-Root (funktioniert auch mit GitHub Pages)
const basePath = self.location.pathname.replace(/\/[^\/]*$/, '') || '/';
const urlsToCache = [
  basePath,
  basePath + 'index.html',
  basePath + 'styles.css',
  basePath + 'script.js',
  basePath + 'manifest.json',
  basePath + 'public/appicon.png',
  basePath + 'public/logo coaching card.png',
  basePath + 'public/Ice Rink.png',
  basePath + 'public/Ice Rink 1-3.png'
];

// Install Event - Cache die Dateien
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache.map(url => new Request(url, {cache: 'reload'})));
      })
      .catch((err) => {
        console.log('Cache failed:', err);
      })
  );
  self.skipWaiting();
});

// Fetch Event - Network first, dann Cache (für bessere Updates)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        // Clone the response
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request);
      })
  );
});

// Activate Event - Lösche alte Caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});


