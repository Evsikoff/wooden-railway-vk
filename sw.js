const CACHE_NAME = 'choochoo-preloader-v1';
const PRECACHE_PATHS = [
  './',
  './index.html',
  './index.0f8f18fe.css',
  './index.5955834b.js',
  './assets/images/others/close.png',
  './assets/images/header/settings/settings_00000.png',
  './assets/images/header/snapshot/snapshot_00000.png'
];

const PRECACHE_URLS = PRECACHE_PATHS.map((path) => new URL(path, self.location).toString());

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(cacheNames.filter((cacheName) => cacheName !== CACHE_NAME).map((cacheName) => caches.delete(cacheName)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        // Clone to avoid locking the stream
        const responseClone = networkResponse.clone();

        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        return networkResponse;
      });
    })
  );
});
