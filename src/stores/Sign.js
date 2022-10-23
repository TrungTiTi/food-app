import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import { db, auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    setDoc,
    getDoc
  } from "firebase/firestore";

export class SignStore {
    loading = true;
    userData = [];
    test = false;
    userProfile = [];

    constructor() {
        makeAutoObservable(this);
    }

    signUp = async (data) => {
        let user = null;
        try {
            this.loading = false;
            user = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const docRef = doc(db, "users", user?.user.uid);
            if (user) {
                setDoc(docRef, {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  email: data.email,
                  address: data.address,
                  phone: data.phone,
                  role: "user",
                });
            }
            alert('SignUp success!');
            this.loading = true;
        } catch (error) {
            this.loading = true;
            alert(error)
        }
    }

    signIn = async (data, navigation) => {
        try {
            this.loading = false;
            if (data.email !== "trung@gmail.com") {
                try {
                  const user = await signInWithEmailAndPassword(auth, data.email, data.password);
                  this.userData = user;
                  alert('SignIn success');

                  if(user){
                    navigation.navigate("RootClientTabs");
                  }
                  
                } catch (error) {
                  alert("Account incorrect!");
                }
                
              } else {
                alert("Account incorrect!");
              }
            
        } catch (error) {
            alert(error);
        }
    }

    getUserProfile = async(idUser) => {
      try {
          const data = await getDoc(doc(db,'users', idUser));
          if(data.exists()){
              this.userProfile = data.data();
          }   
      } catch (error) {
          console.log('errrr', error);
      }
  } 
    
}

export const signStore = new SignStore();
export const storeContext = React.createContext(signStore);
export const useSignStore = () => React.useContext(storeContext);
