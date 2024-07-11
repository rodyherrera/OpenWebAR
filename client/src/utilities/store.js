import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@services/authentication/slice';
import coreReducer from '@services/core/slice';
import objectReducer from '@services/object/slice';

const store = configureStore({
    reducer: {
        core: coreReducer,
        auth: authReducer,
        object: objectReducer
    }
});

export default store;