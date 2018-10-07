import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
};

function authStart(state, action) {
    return updateObject(state, {error: null, loading: true});
}

function authSuccess(state, action) {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}

function authFailed(state, action) {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

function authLogout(state, action) {
    return updateObject(state, {
        token: null,
        userId: null
    });
}

export default reducer;