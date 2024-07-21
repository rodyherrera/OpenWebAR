import APIRequestBuilder from '@utilities/apiRequestBuilder';

/**
 * @constant AuthenticationAPI
 * @description Represents the base endpoint for authentication-related API requests.
 * @type {APIRequestBuilder} An instance of the APIRequestBuilder utility.
*/
export const AuthenticationAPI = new APIRequestBuilder('/auth');

/**
 * @function signUp
 * @description Handles user registration requests.
 * @param {Object} body - The user registration data.
 * @returns {Promise} Resolves or rejects based on the API request outcome. 
*/
export const signUp = AuthenticationAPI.register({
    path: '/sign-up/',
    method: 'POST'
});

/**
 * @function signIn
 * @description Handles user sign-in requests.
 * @param {Object} body - Contains user credentials (likely email or username and password).
 * @returns {Promise} Resolves or rejects based on the API request outcome. 
*/
export const signIn = AuthenticationAPI.register({
    path: '/sign-in/',
    method: 'POST'
});

export const myProfile = AuthenticationAPI.register({
    path: '/me/',
    method: 'GET'
});

/**
 * @function updateMyProfile
 * @description Sends a request to update the profile information of the authenticated user.
 * @param {Object} body - Contains the updated profile data.
 * @returns {Promise} Resolves or rejects based on the API request outcome. 
*/
export const updateMyProfile = AuthenticationAPI.register({
    path: '/me/',
    method: 'PATCH'
});
