importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

const CACHE = "pwa-starter-template-cache";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

const networkFirstPaths = [
    "(.*)\.html"
];

networkFirstPaths.forEach((path) => {
  workbox.routing.registerRoute(
    new RegExp(path),
    new workbox.strategies.NetworkFirst({
      cacheName: CACHE
    })
  );
});