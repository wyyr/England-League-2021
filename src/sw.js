import {baseUrl} from './config.js';

const CACHE_NAME = 'football-apps-v1';
const {assets} = global.serviceWorkerOption;
let assetsToCache = [...assets, './'];

assetsToCache = assetsToCache.map((path) => {
  return new URL(path, global.location).toString();
});

self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.addAll(assetsToCache);
          }),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.url.indexOf(baseUrl) > -1) {
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
          return fetch(request).then((response) => {
            cache.put(request.url, response.clone());

            return response;
          });
        }),
    );
  } else {
    event.respondWith(
        caches.match(request, {ignoreSearch: true}).then((response) => {
          return response || fetch(request);
        }),
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map((cacheName) => {
              if (cacheName !== CACHE_NAME) {
                return caches.delete(cacheName);
              }
            }),
        );
      }),
  );
});

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    icon: './src/assets/icons/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
      self.registration.showNotification('Hai, This is Notification', options),
  );
});
