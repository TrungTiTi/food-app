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
    query,
    where,
} from "firebase/firestore";

export class FoodManagementStore {
    loading = true;
    listFood = [];
    test = '';

    constructor() {
        makeAutoObservable(this);
    }

    getFoods = async (item) => {
        try {
            
            this.loading = false;

            const q = query(collection(db, "Food-product"), where("type", "==", item.type));
            const querySnapshot = await getDocs(q);
            const listData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            this.test = item.type; 
            this.listFood = listData;
            this.loading = true;
        } catch (error) {
            this.loading = true;
            alert(error);
        }
    };
    
}

export const foodManagementStore = new FoodManagementStore();
export const storeContext = React.createContext(foodManagementStore);
export const useFoodManagementStore = () => React.useContext(storeContext);
