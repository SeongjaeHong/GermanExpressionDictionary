const CACHE_NAME = 'german-dictionary-v1';
const urlsToCache = [
  '/',
  '/starred',
  '/data/sample.csv',
  '/favicon/android-chrome-192x192.png',
  '/favicon/android-chrome-512x512.png',
  '/favicon/favicon-32x32.png',
  '/favicon/favicon-16x16.png',
  '/favicon/favicon.ico',
  '/manifest.webmanifest',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : null))
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches
      .match(e.request.url, { ignoreSearch: true })
      .then((res) => {
        return res || fetch(e.request);
      })
      .catch(() => {
        // 오프라인 + 캐시 없음 → 대체 페이지 제공 가능
        if (e.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});
