import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: { isLoggedIn: false, userInfo: {} },
  reducers: {
    authenticate: (state, action) => {
      state.isLoggedIn = action.payload ? true : false;
      state.userInfo = action.payload;
      return state;
    },
  },
});

export const { authenticate } = loginSlice.actions;
export default loginSlice.reducer;
