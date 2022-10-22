import {
    collection,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    updateDoc,
    addDoc,
    getDoc,
    query,
    where,
    limit,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase";

export const actionsFood = Object.freeze({
    ADD_FOOD: "ADD_FOOD",
    ADD_FOOD_SUCCESS: "ADD_FOOD_SUCCESS",
    ADD_FOOD_FAIL: "ADD_FOOD_FAIL",

    GET_FOOD: "GET_FOOD",
    GET_FOOD_SUCCESS: "GET_FOOD_SUCCESS",
    GET_FOOD_FAIL: "GET_FOOD_FAIL",

    GET_AFOOD: "GET_AFOOD",
    GET_AFOOD_SUCCESS: "GET_AFOOD_SUCCESS",
    GET_AFOOD_FAIL: "GET_AFOOD_FAIL",

    GET_FILTER: "GET_FILTER",
    GET_FILTER_SUCCESS: "GET_FILTER_SUCCESS",
    GET_FILTER_FAIL: "GET_FILTER_FAIL",

    UPDATE_FOOD: "UPDATE_FOOD",
    UPDATE_FOOD_SUCCESS: "UPDATE_FOOD_SUCCESS",
    UPDATE_FOOD_FAIL: "UPDATE_FOOD_FAIL",

    REMOVE_FOOD: "REMOVE_FOOD",
    REMOVE_FOOD_SUCCESS: "REMOVE_FOOD_SUCCESS",
    REMOVE_FOOD_FAIL: "REMOVE_FOOD_FAIL",

    ADD_FOOD_LOADING_PROCESS: "ADD_FOOD_LOADING_PROCESS",
    UPDATE_FOOD_LOADING_PROCESS: "UPDATE_FOOD_LOADING_PROCESS",
});

//
const getAFood = (idFood) => async(dispatch) => {
    let foodData = [];
    const getFood = async() => {
        const data = await getDoc(doc(db, "Food-product", idFood));
        let food = {};
        if (data.exists()) {
            food = data.data();
            return food;
        }
    };

    try {
        foodData = await getFood();

        dispatch({ type: actionsFood.GET_AFOOD });

        dispatch({ type: actionsFood.GET_AFOOD_SUCCESS, payload: foodData });
    } catch (err) {
        dispatch({
            type: actionsFood.GET_AFOOD_FAIL,
            payload: err,
        });
    }
};

// get list food
const listFoods = () => async(dispatch) => {
    let foodData = [];
    const getFoods = async() => {
        const data = await getDocs(collection(db, "Food-product"));
        const foodList = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
        return foodList;
    };

    try {
        foodData = await getFoods();

        dispatch({ type: actionsFood.GET_FOOD });

        dispatch({ type: actionsFood.GET_FOOD_SUCCESS, payload: foodData });
    } catch (err) {
        dispatch({
            type: actionsFood.GET_FOOD_FAIL,
            payload: err,
        });
    }
};

const addFood = (itemFood) => async(dispatch) => {
    let newFood;
    try {
        dispatch({ type: actionsFood.ADD_FOOD });

        const storageRef = ref(storage, `files/${itemFood.foodImgName}`);
        const uploadTask = uploadBytesResumable(storageRef, itemFood.foodImg);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                dispatch({
                    type: actionsFood.ADD_FOOD_LOADING_PROCESS,
                    payload: { prog },
                });
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
                    newFood = await addDoc(collection(db, "Food-product"), {
                        name: itemFood.name,
                        des: itemFood.des,
                        price: itemFood.price,
                        type: itemFood.type,
                        image: url,
                    });

                    dispatch({
                        type: actionsFood.ADD_FOOD_SUCCESS,
                        payload: { itemFood: {...itemFood, image: url } },
                    });
                });
            }
        );

        // dispatch({type: actionsFood.ADD_FOOD_SUCCESS, payload: newFood})
    } catch (error) {
        dispatch({ type: actionsFood.ADD_FOOD_FAIL, payload: error });
    }
};

// update food

const updateFood = (itemFood, idFood) => async(dispatch) => {
    try {
        dispatch({ type: actionsFood.UPDATE_FOOD });

        const foodDoc = doc(db, "Food-product", idFood);
        const storageRef = ref(storage, `files/${itemFood.foodImgName}`);
        const uploadTask = uploadBytesResumable(storageRef, itemFood.foodImg);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                dispatch({
                    type: actionsFood.UPDATE_FOOD_LOADING_PROCESS,
                    payload: { prog },
                });
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
                    console.log(url);

                    await updateDoc(foodDoc, {
                        name: itemFood.name,
                        des: itemFood.des,
                        price: itemFood.price,
                        type: itemFood.type,
                        image: url,
                    });

                    dispatch({
                        type: actionsFood.UPDATE_FOOD_SUCCESS,
                        payload: { itemFood: {...itemFood, image: url }, idFood },
                    });
                });
            }
        );
        // dispatch({type: actionsFood.UPDATE_FOOD_SUCCESS})
    } catch (error) {
        dispatch({ type: actionsFood.UPDATE_FOOD_FAIL, payload: error });
    }
};

// delete

const removeFood = (idFood) => async(dispatch) => {
    try {
        dispatch({ type: actionsFood.REMOVE_FOOD });
        await deleteDoc(doc(db, "Food-product", idFood));

        dispatch({ type: actionsFood.REMOVE_FOOD_SUCCESS, payload: idFood });
    } catch (error) {
        dispatch({ type: actionsFood.REMOVE_FOOD_FAIL, payload: error });
    }
};

//

const getFilterFood = (type) => async(dispatch) => {
    let filterData = [];

    const getFoods = async() => {
        const q = query(collection(db, "Food-product"), where("type", "==", type));
        const querySnapshot = await getDocs(q);
        const listData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return listData;
    };

    try {
        filterData = await getFoods();

        dispatch({ type: actionsFood.GET_FILTER });

        dispatch({ type: actionsFood.GET_FILTER_SUCCESS, payload: filterData });
    } catch (err) {
        dispatch({
            type: actionsFood.GET_FILTER_FAIL,
            payload: err,
        });
    }
};

export { listFoods, addFood, updateFood, removeFood, getAFood, getFilterFood };