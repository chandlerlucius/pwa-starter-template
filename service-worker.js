importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("fetch", function (event) {
  if (event.request.url.indexOf('/share/image') > -1) {
    event.respondWith((async () => {
      const data = await event.request.formData();
      const client = await self.clients.get(event.resultingClientId || event.clientId);
      const files = data.getAll('files');

      console.log('files', files);
      client.postMessage({
        files,
        action: 'load'
      });
    })());
  }
});

oninstall = () => {
  skipWaiting();
};

onactivate = () => {
  clients.claim();
};