import * as actions from "../actions/index";
import {put, select} from "redux-saga/effects";
import axios from "../../axios-orders";

function getAuthTokenFromState(state) {
    return state.auth.token;
}

export function* purchaseBurguerSaga(action) {
    yield put(actions.purchaseBurguerStart());
    const authToken = yield select(getAuthTokenFromState);
    try {
        const response = yield axios.post('/orders.json?auth=' + authToken, action.orderData);
        yield put(actions.purchaseBurguerSucess(response.data.name, action.orderData));
    } catch(error) {
        yield put(actions.purchaseBurguerFailed(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/orders.json' + queryParams);
        const orders = [];
        for (let key in response.data) {
            orders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(orders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }

}