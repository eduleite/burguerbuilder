import {all, takeEvery} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as authSagas from './auth';
import * as orderSagas from './order';
import * as burguerBuilderSagas from './burguerBuilder';

function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authSagas.logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authSagas.checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_BEGIN_AUTHENTICATION, authSagas.authSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_LOGIN, authSagas.authCheckStateSaga);
}

function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGUER, orderSagas.purchaseBurguerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, orderSagas.fetchOrdersSaga);
}

function* watchBurguerBuilder() {
    yield takeEvery(actionTypes.FETCH_INGREDIENTS, burguerBuilderSagas.fetchIngredientsSaga)
}

export function* rootSaga() {
    yield all([
        watchAuth(),
        watchOrder(),
        watchBurguerBuilder()
    ]);
}