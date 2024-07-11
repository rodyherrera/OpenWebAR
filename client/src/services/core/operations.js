/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * For related information - https://github.com/rodyherrera/Quantum/
 *
 * All your applications, just in one place. 
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
****/

import * as authSlice from '@services/authentication/slice';
import * as coreSlice from '@services/core/slice';
import errorCodeHandler from '@services/core/errorCodeHandler';
import { addError } from '@services/core/slice';

/**
 * @function globalErrorHandler
 * @description Centralized error handler for Quantum Cloud. Dispatches actions to both the global error store and a slice-specific error store.
 * @param {string} message - The error message to display.
 * @param {Object} [slice=null] - An optional Redux slice object to update with a more readable error.
 * @returns {function} - Redux dispatch function.
*/
export const globalErrorHandler = (message, slice = null) => (dispatch) => {
    const error = {
        // Generates a unique error ID
        id: new Date().getTime(),
        message
    };
    // Adds the error to the global error store
    dispatch(addError(error));
    if(slice === null) return;
    // Translates error codes if necessary
    const readableError = errorCodeHandler(message);
    // Updates the slice-specific error state
    dispatch(slice.setError(readableError));
};

/**
 * @function resetErrorForAllSlices
 * @description Resets the error state for all relevant Redux slices.
 * @returns {function} - Redux dispatch function.
*/
export const resetErrorForAllSlices = () => (dispatch) => {
    dispatch(authSlice.setError(null));
    dispatch(coreSlice.setError(null));
};