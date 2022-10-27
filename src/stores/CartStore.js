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
    query, where, getDoc, orderBy
} from "firebase/firestore";
import {onValue, ref, set} from "firebase/database";
import { getDatabase } from "firebase/database";

export class CartStore {
    loading = true;
    cartData = [];
    orderData = [];
    orderItem = [];
    allCartItem = [];

    constructor() {
        makeAutoObservable(this);
    }

    addCartStorage = async (cartList, navigation) => {
        try {
            this.loading = false;
              if (this.cartData.findIndex((item) => item.id === cartList.id) === -1) {
                    this.cartData = [...this.cartData, cartList]
                    this.loading = true;
                    navigation.navigate('Your Cart')
              }
              this.loading = true;
        } catch (error) {
            alert(error);
        }
    }
    
    addCartFirebase = async (idUser, totalOrder) => {
        const dbRealtime = getDatabase();
       try {
            this.loading = false;
            let dateNow = new Date().toLocaleString() ;
            const docRef = await addDoc(collection(db, "carts"), {
                total: totalOrder,
                idUser: idUser,
                status: false,
                date: dateNow
            });
            this.cartData.map((item) => {
                addDoc(collection(db, "cartItem"), {
                    idCart: docRef?.id,
                    name: item.name,
                    des: item.des,
                    price: item.price,
                    type: item.type,
                    image: item.image,
                    count: item.count,
                    payment: item.payment,
                    
                })
            });

            set(ref(dbRealtime, 'orders/' + `${docRef?.id}/`), {
                id:docRef.id,
                idUser: idUser,
                date: dateNow.toLocaleString(),
                status: false
            });   

            this.cartData = [];
            this.loading = true;
        } catch (error) {
            this.loading = true;
            alert(error);
        }
    }

    getAllCart = async (idUser) => {
        try {
            const q = query(collection(db, "carts"),where("idUser", "==", idUser));
            const querySnapshot = await getDocs(q);
            const listData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            this.orderData = listData;
        } catch (error) {
            alert(error);
        }
    }

    getACart = async (idCart) => {
        try {
            const data = await getDoc(doc(db, 'carts', idCart));
            if(data.exists()){
                order = data.data();
                this.orderData = order;
            }
        } catch (error) {
            alert(error);
        }
    }

    getCartItem = async (idOrder) => {
        try {
            const data = query(collection(db, 'cartItem'), where("idCart", "==", idOrder));
            const querySnapshot = await getDocs(data);
            const orderList = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            this.orderItem = orderList;
        } catch (error) {
            alert(error);
        }
    }

    getAllCartItem = async () => {
        try {
            this.loading = false;
            const data = await getDocs(collection(db, "cartItem"));
            const cateList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            this.allCartItem = cateList;
            this.loading = true;
        } catch (error) {
            alert(error)
        }
      };

}

export const cartStore = new CartStore();
export const storeContext = React.createContext(cartStore);
export const useCartStore = () => React.useContext(storeContext);
