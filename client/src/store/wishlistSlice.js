import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiToggleWishlist } from "../apis/user";

// === Toggle wishlist ===
export const toggleWishlistDB = createAsyncThunk(
  "wishlist/toggle",
  async (data, { rejectWithValue }) => {
    try {
      const res = await apiToggleWishlist(data);
      return res.data.wishlist;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Error wishlist" });
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
      .addCase(toggleWishlistDB.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleWishlistDB.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(toggleWishlistDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
