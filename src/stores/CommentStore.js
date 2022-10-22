import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import { db, auth } from "../../firebase";
import {
    collection,
    getDocs,
    addDoc,
    doc,
    onSnapshot,
    setDoc,
  } from "firebase/firestore";

export class CommentStore {
    loading = true;
    categoryData = [];

    constructor() {
        makeAutoObservable(this);
    }

    getCates = async () => {
        try {
            
            this.loading = false;
            const data = await getDocs(collection(db, "category"));
            const cateList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            this.categoryData = cateList;

            this.loading = true;
        } catch (error) {
            
        }
      };
    
}

export const commentStore = new CommentStore();
export const storeContext = React.createContext(commentStore);
export const useCommentStore = () => React.useContext(storeContext);
