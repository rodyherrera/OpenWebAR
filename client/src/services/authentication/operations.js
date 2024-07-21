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

/**
 * @function updateMyProfile
 * @description Updates the current user's profile information.
 * @param {Object} body - Updated profile data.
 * @returns {Promise} Resolves when profile update is successful.
*/
export const updateMyProfile = (body) => async (dispatch) => {
    // TODO: In backend, verify (newPassword === currentPassword -> err)
    const operation = new OperationHandler(authSlice, dispatch);
    operation.on('response', (data) => {
        dispatch(authSlice.setUser(data));
    });
    operation.use({
        api: authService.updateMyProfile,
        loaderState: authSlice.setIsOperationLoading,
        query: { body }
    });
};
