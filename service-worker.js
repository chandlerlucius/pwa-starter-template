importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("fetch", function (event) {
  if (event.request.method === 'POST') {
    event.respondWith((async () => {
      // const data = await event.request.formData();
      self.clients.claim();
      const client = await self.clients.get(event.resultingClientId || event.clientId);
      // const files = data.getAll('files');

      // console.log('files', files);
      client.postMessage({
        msg: "hello",
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