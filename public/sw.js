// Service Worker для офлайн-работы
const CACHE_NAME = 'schedule-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Стратегия: Cache First для статики, Network First для остального
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request).then((cached) => {
        const fetchPromise = fetch(e.request).then((response) => {
          if (response.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, response.clone()));
          }
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
  }
});

// Фоновая синхронизация (если нужно отправлять данные на сервер позже)
self.addEventListener('sync', (e) => {
  if (e.tag === 'sync-homework') {
    e.waitUntil(syncHomework());
  }
});

async function syncHomework() {
  // Заглушка для будущей синхронизации с бэкендом
  console.log('Sync homework triggered');
}