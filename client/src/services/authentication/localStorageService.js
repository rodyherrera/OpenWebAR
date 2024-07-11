const localStorageId = 'Tryptamine::Authentication::Token';

/**
 * @function setCurrentUserToken
 * @description Stores the provided JWT (JSON Web Token) in browser local storage for authentication purposes.
 * @param {string} token - The JWT to be stored.
*/
export const setCurrentUserToken = (token) => {
    localStorage.setItem(localStorageId, token);
};

/**
 * @function getCurrentUserToken
 * @description Retrieves the currently stored JWT from browser local storage, if it exists.
 * @returns {string|null} The JWT if found, or null otherwise.
*/
export const getCurrentUserToken = () => {
    return localStorage.getItem(localStorageId);
};

/**
 * @function removeCurrentUserToken
 * @description Removes the stored JWT from browser local storage, effectively logging the user out.
*/
export const removeCurrentUserToken = () => {
    localStorage.removeItem(localStorageId);
};