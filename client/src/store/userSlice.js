// src/store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiLogin } from '../apis/user';

// --- HÀM ĐỌC TỪ LOCALSTORAGE ---
const getInitialState = () => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUserJSON = localStorage.getItem('currentUser');

    // console.log("INIT STATE FROM LOCALSTORAGE:", { storedToken, storedUserJSON });

    let storedUser = null;
    if (storedUserJSON && storedUserJSON !== 'undefined') {
        try {
            storedUser = JSON.parse(storedUserJSON);
        } catch (e) {
            console.error("Corrupted user data in localStorage, removing it.", e);
            localStorage.removeItem('currentUser');
        }
    }

    return {
        isLoggedIn: !!storedToken && !!storedUser,
        currentUser: storedUser,
        token: storedToken,
        loading: false,
        error: null
    };
};

// --- ASYNC ACTION ---
export const login = createAsyncThunk(
    'user/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiLogin(data);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Login failed" });
        }
    }
);

// --- SLICE ---
export const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        logout: (state) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('currentUser');
            state.isLoggedIn = false;
            state.currentUser = null;
            state.token = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
.addCase(login.fulfilled, (state, action) => {
    console.log("LOGIN PAYLOAD:", action.payload);

    const user = action.payload?.user;
    const token = action.payload?.token;

    state.loading = false;
    state.isLoggedIn = true;
    state.currentUser = user || null;
    state.token = token || null;

    // // Debug
    // console.log("Saving user:", user);
    // console.log("Saving token:", token);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    if (token) {
        localStorage.setItem('accessToken', String(token)); // ép token thành string luôn
    }
})
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.error = action.payload?.message || "Login failed";
                state.token = null;
                state.currentUser = null;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('currentUser');
            });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
