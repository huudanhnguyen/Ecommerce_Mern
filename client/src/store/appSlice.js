import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: [],
        loading: false,
        error: null,
        success: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        clearState: (state) => {
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase('app/fetchCategories/pending', (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase('app/fetchCategories/fulfilled', (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase('app/fetchCategories/rejected', (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
    
});