import { createSlice } from '@reduxjs/toolkit';

const state = {
    user: {},
    isAuthenticated: false,
    isCachedAuthLoading: true,
    isLoading: false,
    isOperationLoading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        setIsLoading(state, action){
            state.isLoading = action.payload;
        },
        setError(state, action){
            state.error = action.payload;
        },
        setIsOperationLoading(state, action){
            state.isOperationLoading = action.payload;
        },
        setIsCachedAuthLoading(state, action){
            state.isCachedAuthLoading = action.payload;
        },
        setUser(state, action){
            state.user = action.payload;
        },
        setIsAuthenticated(state, action){
            state.isAuthenticated = action.payload;
        }
    }
});

export const { 
    setIsLoading,
    setIsOperationLoading,
    setIsCachedAuthLoading, 
    setUser, 
    setError,
    setIsAuthenticated 
} = authSlice.actions;

export default authSlice.reducer;