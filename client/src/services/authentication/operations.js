import * as authService from '@services/authentication/service';
import * as authSlice from '@services/authentication/slice';
import * as authLocalStorageService from '@services/authentication/localStorageService';
import OperationHandler from '@utilities/operationHandler';

const handleAuthResponse = (data, dispatch) => {
    authLocalStorageService.setCurrentUserToken(data.token);
    dispatch(authSlice.setUser(data.user));
    dispatch(authSlice.setIsAuthenticated(true));
};

/**
 * @function signUp
 * @description Handles new user registration.
 * @param {Object} body - User registration data.
 * @returns {Promise} Resolves when registration is successful.
*/
export const signUp = (body) => async (dispatch) => {
    const operation = new OperationHandler(authSlice, dispatch);
    operation.on('response', (data) => handleAuthResponse(data, dispatch));
    operation.use({
        api: authService.signUp,
        loaderState: authSlice.setIsLoading,
        query: { body }
    });
};

/**
 * @function signIn 
 * @description Handles existing user login.
 * @param {Object} body - User credentials (email/username and password).
 * @returns {Promise} Resolves when login is successful.
*/
export const signIn = (body) => async (dispatch) => {
    const operation = new OperationHandler(authSlice, dispatch);
    operation.on('response', (data) => handleAuthResponse(data, dispatch));
    operation.use({
        api: authService.signIn,
        loaderState: authSlice.setIsLoading,
        query: { body }
    });
};