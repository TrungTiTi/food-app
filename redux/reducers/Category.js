import { actionsCategory } from "../actions/Category";

const initialState = {
    data: [],
    loading: true,
};
const initialStateAdd = {
    data: {},
};
const getCatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsCategory.GET_CATEGORY:
            return {...state, loading: true };
        case actionsCategory.GET_CATEGORY_SUCCESS:
            return {...state, loading: false, data: action.payload };
        case actionsCategory.GET_CATEGORY_FAIL:
            return {...state, loading: false, data: action.payload };

            //
        case actionsCategory.ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload],
            };

        default:
            return state;
    }
};

const addCatesReducer = (state = initialStateAdd, action) => {
    switch (action.type) {
        case actionsCategory.ADD_CATEGORY:
            return {...state, loading: true };
        case actionsCategory.ADD_CATEGORY_SUCCESS:
            return {...state, loading: false, data: action.payload };
        case actionsCategory.ADD_CATEGORY_FAIL:
            return {...state, loading: false, data: action.payload };
        default:
            return state;
    }
};

const updateFoodsReducer = (state = initialStateAdd, action) => {
    switch (action.type) {
        case actionsCategory.UPDATE_CATEGORY:
            return {...state, loading: true };
        case actionsCategory.UPDATE_CATEGORY_SUCCESS:
            return {...state, loading: false, data: action.payload };
        case actionsCategory.UPDATE_CATEGORY_FAIL:
            return {...state, loading: false, data: action.payload };
        default:
            return state;
    }
};

const removeCatesReducer = (state = initialStateAdd, action) => {
    switch (action.type) {
        case actionsCategory.REMOVE_CATEGORY:
            return {...state, loading: true };
        case actionsCategory.REMOVE_CATEGORY_SUCCESS:
            return {...state, loading: false, data: action.payload };
        case actionsCategory.REMOVE_CATEGORY_FAIL:
            return {...state, loading: false, data: action.payload };
        default:
            return state;
    }
};

export {
    getCatesReducer,
    addCatesReducer,
    removeCatesReducer,
    updateFoodsReducer,
};