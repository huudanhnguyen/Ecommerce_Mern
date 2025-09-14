// src/store/redux.js

import { configureStore } from '@reduxjs/toolkit';
import { appSlice} from './appSlice';

import userReducer from './userSlice'; // Import userReducer

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        user: userReducer,   // Slice 'user'
    },
});