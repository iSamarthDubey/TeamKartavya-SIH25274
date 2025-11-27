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

// Push notification handler
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Krishi Hedge";
  const options = {
    body: data.body || data.message || "You have a new notification",
    icon: "/icon.png",
    badge: "/icon.png",
    vibrate: [200, 100, 200],
    tag: data.tag || "notification",
    requireInteraction: data.requireInteraction || false,
    data: {
      url: data.url || "/notifications",
      ...data.metadata
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || "/notifications";
  
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a window open
      for (const client of clientList) {
        if (client.url.includes(urlToOpen) && "focus" in client) {
          return client.focus();
        }
      }
      // If not, open a new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
