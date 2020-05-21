const webPush = require('web-push');

const vapidKeys = {
  'publicKey': '<< Your Public Key >>',
  'privateKey': '<< Your Private Key >>',
};

webPush.setVapidDetails(
    'mailto:test@domain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey,
);
const pushSubscription = {
  'endpoint': '<< Your Endpoint >>',
  'keys': {
    'p256dh': '<< Your p256dh key >>',
    'auth': '<< Your auth key >>',
  },
};
const payload = 'Notifikasi dengan payload!';

const options = {
  gcmAPIKey: '<< Your GCM APIKEY >>',
  TTL: 60,
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options,
);
