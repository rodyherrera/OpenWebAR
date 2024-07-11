/**
 * @constant ERROR_CODES
 * @description A comprehensive object mapping error codes to human-readable error messages.
*/
const ERROR_CODES = {
    'Network Error': 'An error occurred while attempting to communicate with the server. Please check your internet connection and try again later.',
};

/**
 * @constant DEFAULT_ERROR_MESSAGE
 * @description A generic error message used as a fallback when no specific mapping is found in `ERROR_CODES`.
*/
const DEFAULT_ERROR_MESSAGE = 'An unknown error has occurred, please try again or later.';

/**
 * @function errorCodeHandler
 * @description Translates error codes into user-friendly error messages.
 * @param {string} errorCode - The error code received from the server or an internal source.
 * @returns {string} A human-readable error message.
*/
const errorCodeHandler = (errorCode) => {
    console.error('Error ->', errorCode);
    const readableError = ERROR_CODES?.[errorCode] || DEFAULT_ERROR_MESSAGE;
    return readableError;
};

export default errorCodeHandler;