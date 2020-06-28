importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("fetch", function (event) {
  if (event.request.method === 'POST') {
    event.respondWith((async () => {
      // const data = await event.request.formData();
      // const client = await self.clients.get(event.resultingClientId || event.clientId);
      // const files = data.getAll('files');

      self.clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
      }).then(clients => {
        clients.forEach(client => client.postMessage({
          msg: 'Hello from SW'
        }));
      })
    })());
  }
});

oninstall = () => {
  skipWaiting();
};

onactivate = () => {
  clients.claim();
};