import { createSlice } from '@reduxjs/toolkit';

const state = {
    isLoading: false,
    object: {},
    objects: [],
    error: null
};

const objectSlice = createSlice({
    name: 'object',
    initialState: state,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setObjects: (state, action) => {
            state.objects = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setObject(state, action){
            state.object = action.payload;
        }
    }
});

export const { 
    setIsLoading,
    setObjects,
    setError,
    setObject
} = objectSlice.actions;

export default objectSlice.reducer;