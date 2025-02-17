const CACHE_NAME = "avoid-the-obstacles-v1";
const urlsToCache = [
  "/",
  "./src/index.html",
  "./docs/bundle.js",
  "./public/manifest.json",
  "./public/Avoid-The-Obstacles-192.webp",
  "./public/Avoid-The-Obstacles-512.webp"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
