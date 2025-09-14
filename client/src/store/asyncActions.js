// src/store/asyncActions.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../apis';

export const fetchCategories = createAsyncThunk(
    'app/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            // SỬA Ở ĐÂY: Gọi đúng tên hàm là 'getApiCategories'
            const response = await api.getApiCategories(); 
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);