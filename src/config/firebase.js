import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyBTPmkrgCYNpR4Q2FTNlCJTbrpQVMufUwM',
    authDomain: 'daily-todo-1e042.firebaseapp.com',
    projectId: 'daily-todo-1e042',
    storageBucket: 'daily-todo-1e042.appspot.com',
    messagingSenderId: '504897470467',
    appId: '1:504897470467:web:ee7dc0d06529ae720d4e36',
    measurementId: 'G-436EKG33DN',
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
