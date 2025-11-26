const CACHE_NAME = "krishi-hedge-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Simple pass-through for now, or basic caching
  // For a prototype, we don't want aggressive caching to break updates
  // But we need a fetch handler for PWA installability criteria
});
