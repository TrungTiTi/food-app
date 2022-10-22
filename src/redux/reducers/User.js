import { actionsUser } from "../actions/Auth";

const initialState = {
    data: [],
};
const initialStateAdd = {
    data: {},
};
const listUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsUser.GET_USER:
            return {...state, loading: true };
        case actionsUser.GET_USER_SUCCESS:
            return {...state, loading: false, data: action.payload };
        case actionsUser.GET_USER_FAIL:
            return {...state, loading: false, data: action.payload };
        default:
            return state;
    }
};

const getAUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsUser.GET_AUSER:
            return {...state, loading: true };
        case actionsUser.GET_AUSER_SUCCESS:
            return {...state, loading: false, data: action.payload };
        case actionsUser.GET_AUSER_FAIL:
            return {...state, loading: false, data: action.payload };
        default:
            return state;
    }
};

// const addFoodsReducer = (state = initialStateAdd, action: any) => {
//     switch(action.type){
//         case actionsFood.ADD_FOOD:
//             return {...state, loading: true}
//         case actionsFood.ADD_FOOD_SUCCESS:
//             return {...state, loading: false, data: action.payload}
//         case actionsFood.ADD_FOOD_FAIL:
//             return {...state, loading: false, data: action.payload}
//         default:
//             return state
//     }
// }

// const updateFoodsReducer = (state = initialStateAdd, action: any) => {
//     switch(action.type){
//         case actionsFood.UPDATE_FOOD:
//             return {...state, loading: true}
//         case actionsFood.UPDATE_FOOD_SUCCESS:
//             return {...state, loading: false, data: action.payload}
//         case actionsFood.UPDATE_FOOD_FAIL:
//             return {...state, loading: false, data: action.payload}
//         default:
//             return state
//     }
// }

// const removeFoodsReducer = (state = initialStateAdd, action: any) => {
//     switch(action.type){
//         case actionsFood.REMOVE_FOOD:
//             return {...state, loading: true}
//         case actionsFood.REMOVE_FOOD_SUCCESS:
//             return {...state, loading: false, data: action.payload}
//         case actionsFood.REMOVE_FOOD_FAIL:
//             return {...state, loading: false, data: action.payload}
//         default:
//             return state
//     }
// }

export { listUsersReducer, getAUserReducer };