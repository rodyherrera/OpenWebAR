import * as authService from '@services/authentication/service';
import * as authSlice from '@services/authentication/slice';
import * as authLocalStorageService from '@services/authentication/localStorageService';
import * as coreOperations from '@services/core/operations';

/**
 * @function authenticateWithCachedToken
 * @description Attempts to authenticate a user using a previously stored token from  local storage.
 * @param {function} dispatch - The Redux dispatch function.
 * @returns {Promise} Resolves when the authentication attempt is complete.
*/
export const authenticateWithCachedToken = async (dispatch) => {
    try{
        await dispatch(authSlice.setIsCachedAuthLoading(true));
        const cachedSessionToken = authLocalStorageService.getCurrentUserToken();
        if(!cachedSessionToken) 
            return;
        const authenticatedUser = await authService.myProfile({});
        await dispatch(authSlice.setUser(authenticatedUser.data));
        await dispatch(authSlice.setIsAuthenticated(true));
    }catch(error){
        dispatch(coreOperations.globalErrorHandler(error, authSlice));
    }finally{
        await dispatch(authSlice.setIsCachedAuthLoading(false));
    }
};