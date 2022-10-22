import {
    collection,
    getDocs,
    doc,
    setDoc,
    getDoc,
    deleteDoc,
    updateDoc,
    addDoc,
    query,
    where,
} from "firebase/firestore";
import { onValue, ref, set } from "firebase/database";
import { getDatabase } from "firebase/database";
import { db } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const actionsCart = Object.freeze({
    ADD_CART: "ADD_CART",
    ADD_CART_SUCCESS: "ADD_CART_SUCCESS",
    ADD_CART_FAIL: "ADD_CART_FAIL",

    GET_CART: "GET_CART",
    GET_CART_SUCCESS: "GET_CART_SUCCESS",
    GET_CART_FAIL: "GET_CART_FAIL",

    GET_ORDER: "GET_ORDER",
    GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS",
    GET_ORDER_FAIL: "GET_ORDER_FAIL",

    GET_ORDERLIST: "GET_ORDERLIST",
    GET_ORDERLIST_SUCCESS: "GET_ORDERLIST_SUCCESS",
    GET_ORDERLIST_FAIL: "GET_ORDERLIST_FAIL",

    GET_FILTERORDER: "GET_FILTERORDER",
    GET_FILTERORDER_SUCCESS: "GET_FILTERORDER_SUCCESS",
    GET_FILTERORDER_FAIL: "GET_FILTERORDER_FAIL",
});

// export const RealTime = (idOrder: string, idUser: string, status: boolean) => {
//     const dbRealtime = getDatabase();
//     let dateNow = new Date().toLocaleString() + "";

//     set(ref(dbRealtime, 'orders/' + `${idOrder}/` + idUser ? idUser : '' ), {
//         id:idOrder,
//         idUser: idUser,
//         date: dateNow,
//         status: status
//     });
// }

const addCart = (idUser, totalOrder) => async(dispatch) => {
    const dbRealtime = getDatabase();
    const newCart = {};
    try {
        const ca = AsyncStorage.getItem("cart");
        const cart = ca;

        dispatch({ type: actionsCart.ADD_CART });

        const docRef = await addDoc(collection(db, "carts"), {
            total: totalOrder,
            idUser: idUser,
            status: false,
        });

        cart &&
            cart.map((item) => {
                addDoc(collection(db, "cartItem"), {
                    idCart: docRef.id,
                    name: item.name,
                    des: item.des,
                    price: item.price,
                    type: item.type,
                    image: item.image,
                    count: item.count,
                    payment: item.payment,
                });
            });
        let dateNow = new Date().toLocaleString() + "";
        set(ref(dbRealtime, "orders/" + `${docRef?.id}/`), {
            id: docRef.id,
            idUser: idUser,
            date: dateNow,
            status: false,
        });

        dispatch({ type: actionsCart.ADD_CART_SUCCESS, payload: newCart });
    } catch (error) {
        dispatch({ type: actionsCart.ADD_CART_FAIL, payload: error });
    }
};

const getCartItem = (idOrder) => async(dispatch) => {
    let cartData = [];
    const getCarts = async() => {
        const data = query(
            collection(db, "cartItem"),
            where("idCart", "==", idOrder)
        );
        const querySnapshot = await getDocs(data);
        const orderList = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return orderList;
    };

    try {
        cartData = await getCarts();

        dispatch({ type: actionsCart.GET_CART });

        dispatch({ type: actionsCart.GET_CART_SUCCESS, payload: cartData });
    } catch (err) {
        dispatch({
            type: actionsCart.GET_CART_FAIL,
            payload: err,
        });
    }
};

// get an Order with id
const getOrder = (idOrder) => async(dispatch) => {
    let orderData = [];
    const getOders = async() => {
        const data = await getDoc(doc(db, "carts", idOrder));
        let order = {};
        if (data.exists()) {
            order = data.data();
            return order;
        }
    };

    try {
        orderData = await getOders();

        dispatch({ type: actionsCart.GET_ORDER });

        dispatch({ type: actionsCart.GET_ORDER_SUCCESS, payload: orderData });
    } catch (err) {
        dispatch({
            type: actionsCart.GET_ORDER_FAIL,
            payload: err,
        });
    }
};

// get all Order
const getListOrder = () => async(dispatch) => {
    let orderData = [];
    const getOders = async() => {
        const data = await getDocs(collection(db, "carts"));
        const orderList = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return orderList;
    };

    try {
        orderData = await getOders();

        dispatch({ type: actionsCart.GET_ORDERLIST });

        dispatch({ type: actionsCart.GET_ORDERLIST_SUCCESS, payload: orderData });
    } catch (err) {
        dispatch({
            type: actionsCart.GET_ORDERLIST_FAIL,
            payload: err,
        });
    }
};

// filter id Carts of user current
const getFilterOrder = (idUser) => async(dispatch) => {
    let filterData = [];

    const getOrders = async() => {
        const q = query(collection(db, "carts"), where("idUser", "==", idUser));
        const querySnapshot = await getDocs(q);
        const listData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return listData;
    };

    try {
        filterData = await getOrders();

        dispatch({ type: actionsCart.GET_FILTERORDER });

        dispatch({
            type: actionsCart.GET_FILTERORDER_SUCCESS,
            payload: filterData,
        });
    } catch (err) {
        dispatch({
            type: actionsCart.GET_FILTERORDER_FAIL,
            payload: err,
        });
    }
};

// get

export { addCart, getCartItem, getOrder, getListOrder, getFilterOrder };