import {
    collection,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    updateDoc,
    addDoc,
    getDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const actionsCategory = Object.freeze({
    ADD_CATEGORY: "ADD_CATEGORY",
    ADD_CATEGORY_SUCCESS: "ADD_CATEGORY_SUCCESS",
    ADD_CATEGORY_FAIL: "ADD_CATEGORY_FAIL",

    GET_CATEGORY: "GET_CATEGORY",
    GET_CATEGORY_SUCCESS: "GET_CATEGORY_SUCCESS",
    GET_CATEGORY_FAIL: "GET_CATEGORY_FAIL",

    UPDATE_CATEGORY: "UPDATE_CATEGORY",
    UPDATE_CATEGORY_SUCCESS: "UPDATE_CATEGORY_SUCCESS",
    UPDATE_CATEGORY_FAIL: "UPDATE_CATEGORY_FAIL",

    REMOVE_CATEGORY: "REMOVE_CATEGORY",
    REMOVE_CATEGORY_SUCCESS: "REMOVE_CATEGORY_SUCCESS",
    REMOVE_CATEGORY_FAIL: "REMOVE_CATEGORY_FAIL",
});

// get list food
const getCategorys = () => async(dispatch) => {
    let cateData = [];
    const getCates = async() => {
        const data = await getDocs(collection(db, "category"));
        const cateList = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
        return cateList;
    };

    try {
        cateData = await getCates();

        dispatch({ type: actionsCategory.GET_CATEGORY });

        dispatch({ type: actionsCategory.GET_CATEGORY_SUCCESS, payload: cateData });
    } catch (err) {
        dispatch({
            type: actionsCategory.GET_CATEGORY_FAIL,
            payload: err,
        });
    }
};

// add food
const addCate = (itemFood) => async(dispatch) => {
    // console.log(typeFood);

    let newType;
    try {
        dispatch({ type: actionsCategory.ADD_CATEGORY });

        const storageRef = ref(storage, `fileTypes/${itemFood.typeImgName}`);
        const uploadTask = uploadBytesResumable(storageRef, itemFood.typeImg);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                dispatch({
                    type: actionsCategory.ADD_CATEGORY_SUCCESS,
                    payload: { prog },
                });
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(url) => {
                    newType = await addDoc(collection(db, "category"), {
                        type: itemFood.typeFood,
                        image: url,
                    });
                    // dispatch({ type: actionsCategory.ADD_CATEGORY})

                    // addDoc(collection(db, "category"), {
                    //     type: typeFood
                    // })

                    dispatch({
                        type: actionsCategory.ADD_CATEGORY_SUCCESS,
                        payload: { itemFood: {...itemFood, image: url } },
                    });
                });
            }
        );
    } catch (error) {
        dispatch({ type: actionsCategory.ADD_CATEGORY_FAIL, payload: error });
    }
};

// update food

const updateCate = (itemCate, idCate) => async(dispatch) => {
    try {
        dispatch({ type: actionsCategory.UPDATE_CATEGORY });
        const cateDoc = doc(db, "category", idCate);
        await updateDoc(cateDoc, {
            type: itemCate.type,
        });
        dispatch({ type: actionsCategory.UPDATE_CATEGORY_SUCCESS });
    } catch (error) {
        dispatch({ type: actionsCategory.UPDATE_CATEGORY_FAIL, payload: error });
    }
};

// delete

const removeCategory = (idCate) => async(dispatch) => {
    try {
        dispatch({ type: actionsCategory.REMOVE_CATEGORY });
        await deleteDoc(doc(db, "category", idCate));

        dispatch({ type: actionsCategory.REMOVE_CATEGORY_SUCCESS });
    } catch (error) {
        dispatch({ type: actionsCategory.REMOVE_CATEGORY_FAIL, payload: error });
    }
};

export { getCategorys, addCate, removeCategory, updateCate };