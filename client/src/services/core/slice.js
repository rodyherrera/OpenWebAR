import { createSlice } from '@reduxjs/toolkit';

const state = {
    errors: [],
    error: null,
    gesture: '',
    selectedDashboardTab: 0
};

const coreSlice = createSlice({
    name: 'core',
    initialState: state,
    reducers: {
        setSelectedDashboardTab(state, action){
            state.selectedDashboardTab = action.payload;
        },
        setGesture(state, action){
            state.gesture = action.payload;
        },
        setError(state, action){
            state.error = action.payload;
        },
        addError(state, action){
            const error = action.payload;
            state.errors.push(error);
        },
        removeError(state, action){
            const errorId = action.payload;
            state.errors = state.errors.filter((error) => error.id !== errorId);
        }
    }
});

export const {
    setError,
    addError,
    removeError,
    setSelectedDashboardTab,
    setGesture
} = coreSlice.actions;

export default coreSlice.reducer;