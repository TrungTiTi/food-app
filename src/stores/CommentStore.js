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
import {onValue, ref, set} from "firebase/database";
import { getDatabase } from "firebase/database";

export class CommentStore {
    loading = true;
    commentData = [];

    constructor() {
        makeAutoObservable(this);
    }

    addComment = async (foodID, userID, rating, comment) => {
        const dbRealtime = getDatabase();
        try {
            
            this.loading = false;
            let dateNow = new Date().toLocaleString() + "";
        
            set(ref(dbRealtime, 'rating/' + `${foodID}/` + userID ), {
                id: userID,
                rate: rating,
                comment: comment,
                date: dateNow
                    
            })
            this.loading = true;
        } catch (error) {
            alert(error)
        }
      };
    
    // getCommentByUserId = async (id) => {
    //     try {
    //         const dbRealtime = getDatabase();
    //         onValue(ref(dbRealtime, `rating/${id}`), (snapshot) => {
    //             this.commentData = [];
    //             const data = snapshot.val();
                
    //             if (data !== null) {
    //             Object.values(data).map((todo) => {
    //                 this.commentData = [...this.commentData, todo];
    //             });
    //             }
    //         });
    //     } catch (error) {
    //         alert(error);
    //     }
    // }
}

export const commentStore = new CommentStore();
export const storeContext = React.createContext(commentStore);
export const useCommentStore = () => React.useContext(storeContext);
