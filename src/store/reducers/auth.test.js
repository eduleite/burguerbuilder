import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';


describe('auth reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store the token uppon login', () => {
        const fromState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        };
        const action = {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-userid'
        };
        const expected = {
            token: 'some-token',
            userId: 'some-userid',
            error: null,
            loading: false,
            authRedirectPath: '/'
        };
        expect(reducer(fromState, action)).toEqual(expected);
    })

});