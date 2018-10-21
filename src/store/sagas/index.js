import {all, takeEvery, takeLatest} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import * as authSagas from './auth';
import * as orderSagas from './order';
import * as burguerBuilderSagas from './burguerBuilder';

function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authSagas.logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authSagas.checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_BEGIN_AUTHENTICATION, authSagas.authSaga),
        takeEvery(actionTypes.AUTH_CHECK_LOGIN, authSagas.authCheckStateSaga)
    ]);
}

function* watchOrder() {
    yield all([
        takeLatest(actionTypes.PURCHASE_BURGUER, orderSagas.purchaseBurguerSaga),
        takeEvery(actionTypes.FETCH_ORDERS, orderSagas.fetchOrdersSaga)
    ]);
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