self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('notes-v1').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/js/notes.js',
        '/favicon.ico'
      ]);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // It can update the cache to serve updated content on the next request
      return cachedResponse || fetch(event.request);
    })
  );
});
