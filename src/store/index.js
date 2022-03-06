import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import shopSlice from "./shopSlice";
import uiSlice from "./uiSlice";
const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  },
});
export default store;
