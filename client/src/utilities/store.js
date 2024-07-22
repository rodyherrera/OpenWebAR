import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@services/authentication/slice';
import coreReducer from '@services/core/slice';

const store = configureStore({
    reducer: {
        core: coreReducer,
        auth: authReducer
    }
});

export default store;