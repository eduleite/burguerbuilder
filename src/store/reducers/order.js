import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGUER_START: return purchaseBurguerStart(state, action);
        case actionTypes.PURCHASE_BURGUER_SUCCESS: return purchaseBurguerSuccess(state, action);
        case actionTypes.PURCHASE_BURGUER_FAILED: return purchaseBurguerFailed(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);
        default: return state;
    }
}

function purchaseInit(state, action) {
    return updateObject(state, {purchased: false});
}

function purchaseBurguerStart(state, action) {
    return updateObject(state, {loading: true});
}

function purchaseBurguerSuccess(state, action) {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    });
}

function purchaseBurguerFailed(state, action) {
    return updateObject(state, {loading: false});
}

function fetchOrdersStart(state, action) {
    return updateObject(state, {loading: true});
}

function fetchOrdersSuccess(state, action) {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
}

function fetchOrdersFailed(state, action) {
    return updateObject(state, {loading: false});
}

export default reducer;