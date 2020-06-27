importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.skipWaiting();

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.NetworkFirst()
);

const shareTargetHandler = async ({
  event
}) => {
  const client = await self.clients.get(event.resultingClientId || event.clientId);
  const formData = await event.request.formData();
  const mediaFiles = formData.getAll('media');
  for (const mediaFile of mediaFiles) {
    client.postMessage({mediaFile, action: 'load-image'});
  }
};

workbox.routing.registerRoute(
  '/_share-target',
  shareTargetHandler,
  'POST'
);