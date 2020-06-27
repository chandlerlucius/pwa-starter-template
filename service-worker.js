importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.skipWaiting();

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.NetworkFirst()
);

const shareTargetHandler = async ({event}) => {
  const data = await event.request.formData();
  const client = await self.clients.get(event.resultingClientId || event.clientId);
  const files = data.getAll('files');

  client.postMessage({ msg: "Hey I just got a fetch from you!"});
}

workbox.routing.registerRoute(
  '/share/image',
  shareTargetHandler,
  'POST'
);