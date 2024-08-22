import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalAmount: 0,
    numberOfItems: 0,
    cartItems: [],
    discountAmount: 0,
    shippingCost: 0,
    convenienceFee: 4.99,
  },
  reducers: {
    addItems: (state, action) => {
      state.cartItems = [action.payload, ...state.cartItems];
      state.numberOfItems = state.cartItems.length;
      state.totalAmount += Number(action.payload.price.toFixed(2));
      state.discountAmount += Number(
        (action.payload.price * 1.8 - action.payload.price).toFixed(2)
      );
      state.shippingCost = Number((state.totalAmount * 0.1).toFixed(2));
      return state;
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.numberOfItems--;
      state.totalAmount = Number(
        (state.totalAmount - action.payload.price).toFixed(2)
      );
      state.discountAmount = Number(
        (
          state.discountAmount -
          (action.payload.price * 1.8 - action.payload.price)
        ).toFixed(2)
      );
      state.shippingCost = Number(
        (state.shippingCost - action.payload.price * 0.1).toFixed(2)
      );
      return state;
    },
  },
});

export const { addItems, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
