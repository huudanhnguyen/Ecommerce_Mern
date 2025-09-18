import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiAddToCart, apiRemoveFromCart } from "../apis/user";

// === Add to cart ===
export const addToCartDB = createAsyncThunk(
  "cart/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await apiAddToCart(data);
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Error add cart" });
    }
  }
);

// === Remove from cart ===
export const removeFromCartDB = createAsyncThunk(
  "cart/remove",
  async (data, { rejectWithValue }) => {
    try {
      const res = await apiRemoveFromCart(data);
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Error remove cart" });
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartDB.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartDB.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToCartDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCartDB.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;
