import axios from "../../axios-orders";
import {put} from "redux-saga/effects";
import * as actions from "../actions";

export function* fetchIngredientsSaga(action) {
    try {
        const response = yield axios.get('/ingredients.json');
        yield put(actions.setIngrediens(response.data));
    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    }
}