import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartRedcer from "./cartSlice";
import authReducer from "./loginSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartRedcer,
    login: authReducer,
  },
});

export default store;
