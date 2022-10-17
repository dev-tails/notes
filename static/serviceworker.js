const cacheName = "notes-v1";

self.addEventListener("fetch", (event) => {
  let promise = new Promise(async (resolve) => {
    try {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return resolve(cachedResponse);
      }
    } catch (err) {
      console.error(err);
    }
    const fetchedResponse = await fetch(event.request);
    const cache = await caches.open(cacheName);
    cache.put(event.request, fetchedResponse.clone());
    resolve(fetchedResponse);
  });

  event.respondWith(promise);
});
