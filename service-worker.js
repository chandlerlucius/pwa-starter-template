importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.skipWaiting();

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.NetworkFirst()
);

onfetch = async (event) => {
  if (event.request.method !== 'POST') return;

  /* This is to fix the issue Jake found */
  event.respondWith(Response.redirect('/share/image/'));

  event.waitUntil(async function () {
    const data = await event.request.formData();
    const client = await self.clients.get(event.resultingClientId || event.clientId);
    // Get the data from the named element 'file'
    const file = data.get('file');

    console.log('file', file);
    client.postMessage({
      file,
      action: 'load-image'
    });
  }());
};