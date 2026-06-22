import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCfCPomW-XstAbSG7sQPDYPz2rzSgx-6Tg',
  authDomain: 'santoregano-8a10a.firebaseapp.com',
  projectId: 'santoregano-8a10a',
  storageBucket: 'santoregano-8a10a.firebasestorage.app',
  messagingSenderId: '751836104224',
  appId: '1:751836104224:web:37d2640d357302cc145e45',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
