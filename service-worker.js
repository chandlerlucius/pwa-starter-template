importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.skipWaiting();

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.NetworkFirst()
);

const shareTargetHandler = async ({event}) => {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        const formData = await event.request.formData();
        const mediaFiles = formData.getAll('media');
        for (const mediaFile of mediaFiles) {
          registration.showNotification('Vibration Sample', {
            body: mediaFile.name + " " + mediaFile.size + " " + mediaFile.type,
            tag: 'vibration-sample'
          });
        }
      });
    }
  });
};

workbox.routing.registerRoute(
  '/_share-target',
  shareTargetHandler,
  'POST'
);