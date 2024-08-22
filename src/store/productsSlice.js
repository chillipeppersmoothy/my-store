import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    mens: [],
    womens: [],
    electronics: [],
    jewellery: [],
    fetchDone: false,
    searchQuery: "",
  },
  reducers: {
    setProducts: (state, actions) => {
      state.products = actions.payload;
      state.mens = state.products.filter(
        (product) => product.category === "men's clothing"
      );
      state.womens = state.products.filter(
        (product) => product.category === "women's clothing"
      );
      state.electronics = state.products.filter(
        (product) => product.category === "electronics"
      );
      state.jewellery = state.products.filter(
        (product) => product.category === "jewelery"
      );
      return state;
    },
    fetched: (state) => {
      if (state.products.length) {
        state.fetchDone = true;
      }
      return;
    },
    filterData: (state, action) => {
      state.searchQuery = action.payload;
      return state;
    },
  },
});

export const { setProducts, fetched, filterData } = productsSlice.actions;
export default productsSlice.reducer;
