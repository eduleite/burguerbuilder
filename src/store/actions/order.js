import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurguerSucess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurguerFailed = error => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAILED,
        error: error
    };
};

export const purchaseBurguerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGUER_START
    };
};

export const purchaseBurguer = orderData => {
    return dispatch => {
        dispatch(purchaseBurguerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurguerSucess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurguerFailed(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(response => {
                const orders = [];
                for (let key in response.data) {
                    orders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(orders));
            })
            .catch((error) => {
                dispatch(fetchOrdersFail(error));
            });
    }
};
