import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice; // export default authSlice.reducer is another option but then in the store/index.js we have to delete the .reducer in the configureStore so that it looks like conficureStore({reducer: {auth: authSlice}})
