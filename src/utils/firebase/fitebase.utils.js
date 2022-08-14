import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6vP0hciNi8vED0ahekf7m-lC3qQ91qKw",
  authDomain: "urccs-shop-db.firebaseapp.com",
  projectId: "urccs-shop-db",
  storageBucket: "urccs-shop-db.appspot.com",
  messagingSenderId: "708488405846",
  appId: "1:708488405846:web:609a466687cc30e1fd2cf7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
        userAuth, 
        additionalinformation={}
        ) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

   

    // if user data exists
    if(!userSnapshot.exists()) {

    // if user data does not exists create 
    //(set the document with data from user Auth in my collection)
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt,
                ...additionalinformation,
            });
        } catch (error){
            console.log('error creating the user', error.message)
        }
    }

    //retrun userDocRef
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    //if we do not get an email or password, exit immediately
    if(!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthWithEmailAndPassword = async (email, password) => {
    //if we do not get an email or password, exit immediately
    if(!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password);
};