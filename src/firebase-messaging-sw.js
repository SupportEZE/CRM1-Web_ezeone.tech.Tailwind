importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCSFgNpGm2CBSrf7ZDz47IGveIejf6fmWQ",
  authDomain: "ezeone-5903f.firebaseapp.com",
  projectId: "ezeone-5903f",
  storageBucket: "ezeone-5903f.firebasestorage.app",
  messagingSenderId: "606657196887",
  appId: "1:606657196887:web:fd522b5602445830bc8412",
  measurementId: "G-KBD0LCCPLD"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/firebase-logo.png'
  };

  // Notify all open tabs
  const channel = new BroadcastChannel('firebase-messages');
  channel.postMessage(payload);

  // Show system notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
