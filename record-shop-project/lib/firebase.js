import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyA-1B4AuWNtR_absD7Y2uYBqFOAu9mGxkE',
	authDomain: 'records-shop-project.firebaseapp.com',
	projectId: 'records-shop-project',
	storageBucket: 'records-shop-project.appspot.com',
	messagingSenderId: '56058613481',
	appId: '1:56058613481:web:ebaa8fc4380dbc4b266a78',
	measurementId: 'G-TZT701STVH',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
