import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
    getAFoodReducer,
    getFilterReducer,
    listFoodsReducer,
} from "./reducers/Food";
import { composeWithDevTools } from "redux-devtools-extension";
import { getAUserReducer, listUsersReducer } from "./reducers/User";
import { getCatesReducer } from "./reducers/Category";
import {
    addCartReducer,
    getCartItemsReducer,
    getFilterOrdersReducer,
    getOrderListsReducer,
    getOrdersReducer,
} from "./reducers/Cart";

const reducer = combineReducers({
    foodList: listFoodsReducer,
    aFood: getAFoodReducer,
    userList: listUsersReducer,
    cateList: getCatesReducer,
    aUser: getAUserReducer,
    filterList: getFilterReducer,
    cartList: getCartItemsReducer,
    aOrder: getOrdersReducer,
    orderList: getOrderListsReducer,
    filterOrder: getFilterOrdersReducer,

    // testAdd: addFoodsReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;