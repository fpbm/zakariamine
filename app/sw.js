importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

// TODO: fill in messaging sender id
firebase.initializeApp({
   apiKey: "AIzaSyAeft3qfbEFVujyy0myv-QowAV_Gu87u_E",
    authDomain: "fpbm-note.firebaseapp.com",
    databaseURL: "https://fpbm-note.firebaseio.com",
    projectId: "fpbm-note",
    storageBucket: "fpbm-note.appspot.com",
    messagingSenderId: "220565890649",
    appId: "1:220565890649:web:9f0f6fe5eb2ed83a2e3348",
    measurementId: "G-BXNN8ERMR4"
});

const messaging = firebase.messaging();

// Installs service worker
self.addEventListener('install', (event) => {
  console.log('Service worker installed');
});

self.addEventListener('notificationclick', (event) => {
  // Event actions derived from event.notification.data from data received
  var eventURL = event.notification.data;
  event.notification.close();
  if (event.action === 'confirmAttendance') {
    clients.openWindow(eventURL.confirm);
  } else {
    clients.openWindow(eventURL.decline);
  }
}, false);

messaging.setBackgroundMessageHandler((payload) => {
  // Parses data received and sets accordingly
  const data = JSON.parse(payload.data.notification);
  const notificationTitle = data.title;
  const notificationOptions = {
    body: data.body,
    icon: 'http://www.fpbm.ma/new/exam/assets/img/logo.png',
    actions: [
      {action: 'confirmAttendance', title: '👍 Confirm attendance'},
      {action: 'cancel', title: '👎 Not coming'}
    ],
    // For additional data to be sent to event listeners, needs to be set in this data {}
    data: {confirm: data.confirm, decline: data.decline}
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
