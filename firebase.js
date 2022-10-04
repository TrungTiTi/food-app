import { fbConfig } from "./env";

import { initializeApp } from 'firebase/app';
import {getFirestore} from '@firebase/firestore';
import {getStorage} from '@firebase/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: `${fbConfig.apiKey}`,
    authDomain: `${fbConfig.authDomain}`, 
    projectId: `${fbConfig.projectId}`,
    storageBucket: `${fbConfig.storageBucket}`,
    messagingSenderId: `${fbConfig.messagingSenderId}`,
    appId: `${fbConfig.appId}`,
  };

  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db= getFirestore(app);
const storage = getStorage(app);


export { auth, db, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword };

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {{
    signInWithPopup(auth, provider)
        .then((res) => {
            console.log(res);
            
        })
        .catch((err) => {
            console.log(err);
            
        })
}}
