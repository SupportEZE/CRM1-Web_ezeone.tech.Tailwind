import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { environment } from '../environments/environment'; // adjust path as needed

// ✅ Initialize Firebase App
const firebaseApp = initializeApp(environment.firebase);

// ✅ Export initialized Messaging
export const messaging = getMessaging(firebaseApp);
