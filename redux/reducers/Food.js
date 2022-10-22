import { actionsFood } from "../actions/Food";

const initialState = {
    data: [],
    loading: false,
    prog: undefined,
    addFoodprog: -1,
    updateFoodprog: -1,
};
const initialStateAdd = {
    data: {},
};
const listFoodsReducer = (state = initialState, action) => {
    switch (action.type) {
        // get
        case actionsFood.GET_FOOD:
            return {...state, loading: true };
        case actionsFood.GET_FOOD_SUCCESS:
            return {...state, loading: false, data: action.payload };
        case actionsFood.GET_FOOD_FAIL:
            return {...state, loading: false, data: action.payload };

            // add
        case actionsFood.ADD_FOOD:
            return {...state, loading: true };

        case actionsFood.ADD_FOOD_SUCCESS:
            {
                return {
                    ...state,
                    loading: false,
                    data: [...state.data, action.payload.itemFood],
                };
            }

        case actionsFood.ADD_FOOD_LOADING_PROCESS:
            {
                return {...state, addFoodprog: action.payload.prog };
            }

            // update
        case actionsFood.UPDATE_FOOD_SUCCESS:
            {
                const newData = state.data.map((item) => {
                    if (item.id === action.payload.idFood) {
                        return {...item, ...action.payload.itemFood };
                    }
                    return item;
                });
                return {...state, loading: false, data: newData };
            }

        case actionsFood.UPDATE_FOOD_FAIL:
            return {...state, loading: false, data: action.payload };

        case actionsFood.UPDATE_FOOD_LOADING_PROCESS:
            {
                return {...state, updateFoodprog: action.payload.prog };
            }
            // remove

        case actionsFood.REMOVE_FOOD_SUCCESS:
            {
                const newData = state.data.map((item) => {
                    if (item.id === action.payload) {
                        return {...item };
                    }
                    return item;
                });
                return {...state, loading: false, data: newData };
            }

        case actionsFood.REMOVE_FOOD_FAIL:
            return {...state, loading: false, data: action.payload };

            // loading process add food

        default:
            return state;
    }
};

const getAFoodReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsFood.GET_AFOOD:
            return {...state, loading: true };
        case actionsFood.GET_AFOOD_SUCCESS:
            return {...state, loading: false, data: action.payload };
        case actionsFood.GET_AFOOD_FAIL:
            return {...state, loading: false, data: action.payload };
        default:
            return state;
    }
};

const getFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsFood.GET_FILTER:
            return {...state, loading: true };
        case actionsFood.GET_FILTER_SUCCESS:
            return {...state, loading: false, data: action.payload };
        case actionsFood.GET_FILTER_FAIL:
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

// const updateFoodsReducer = (state: any, action: any) => {
//     switch(action.type){
//         case actionsFood.UPDATE_FOOD:
//             return {...state, loading: true}
//         case actionsFood.UPDATE_FOOD_SUCCESS:{
//             console.log('state')
//             console.log(state)
//             const newData = state.data.map((item:any)=>{
//                 if(item.id=== action.payload.idFood){
//                     return {...item, ...action.payload.itemFood}
//                 }
//                 return item;
//             })
//              return {...state, loading: false, data: newData}
//         }

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

export { listFoodsReducer, getAFoodReducer, getFilterReducer };