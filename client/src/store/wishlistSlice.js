import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetWishlist,
  apiAddToWishlist,
  apiRemoveFromWishlist,
} from "../apis/user";

// === Get wishlist ===
export const getWishlistDB = createAsyncThunk(
  "wishlist/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiGetWishlist();
      return res.data.wishlist;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Error get wishlist" });
    }
  }
);

// === Add wishlist ===
export const addToWishlistDB = createAsyncThunk(
  "wishlist/add",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await apiAddToWishlist(productId);
      return res.data.wishlist;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Error add wishlist" });
    }
  }
);

// === Remove wishlist ===
export const removeFromWishlistDB = createAsyncThunk(
  "wishlist/remove",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await apiRemoveFromWishlist(productId);
      return res.data.wishlist;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Error remove wishlist" });
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getWishlistDB.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlistDB.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getWishlistDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addToWishlistDB.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // REMOVE
      .addCase(removeFromWishlistDB.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
