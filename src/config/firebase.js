import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB8mOz9VkGizAZvyZCWOnMyDhETCi8o5WE',
  authDomain: 'moneycontrol-eed33.firebaseapp.com',
  projectId: 'moneycontrol-eed33',
  storageBucket: 'moneycontrol-eed33.appspot.com',
  messagingSenderId: '176388755167',
  appId: '1:176388755167:web:cfff45c60f74d7a322a36a'
};

const app = firebase.initializeApp(firebaseConfig);

export const firestore = app.firestore();
export const auth = app.auth();
export const storage = app.storage();

export const database = {
  entries: firestore.collection('entries'),
  formatDoc: doc => {
    return {
      id: doc.id,
      ...doc.data()
    };
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp
};
