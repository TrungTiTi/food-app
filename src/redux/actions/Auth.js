import {
    collection,
    getDocs,
    doc,
    setDoc,
    getDoc,
    deleteDoc,
    updateDoc,
    where,
    query,
} from "firebase/firestore";
import { db } from "../../../firebase";

export const actionsUser = Object.freeze({
    REGISTER: "REGISTER",
    REGSTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAIL: "REGISTER_FAIL",

    GET_USER: "GET_USER",
    GET_USER_SUCCESS: "GET_USER_SUCCESS",
    GET_USER_FAIL: "GET_USER_FAIL",

    GET_AUSER: "GET_AUSER",
    GET_AUSER_SUCCESS: "GET_AUSER_SUCCESS",
    GET_AUSER_FAIL: "GET_AUSER_FAIL",
});

// get user
const listUsers = () => async(dispatch) => {
    let userData = [];
    const getUsers = async() => {
        const q = query(collection(db, "users"), where("role", "==", "user"));
        const data = await getDocs(q);
        const userList = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return userList;
    };

    try {
        userData = await getUsers();

        dispatch({ type: actionsUser.GET_USER });

        dispatch({ type: actionsUser.GET_USER_SUCCESS, payload: userData });
    } catch (err) {
        dispatch({
            type: actionsUser.GET_USER_FAIL,
            payload: err,
        });
    }
};

// get a user

const getAUser = (idUser) => async(dispatch) => {
    let userData = [];
    const getUser = async() => {
        const data = await getDoc(doc(db, "users", idUser));
        let user = {};
        if (data.exists()) {
            user = data.data();
            return user;
        }
    };

    try {
        userData = await getUser();

        dispatch({ type: actionsUser.GET_AUSER });

        dispatch({ type: actionsUser.GET_AUSER_SUCCESS, payload: userData });
    } catch (err) {
        dispatch({
            type: actionsUser.GET_AUSER_FAIL,
            payload: err,
        });
    }
};

export { listUsers, getAUser };