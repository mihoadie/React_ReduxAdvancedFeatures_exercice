import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartIsVisible: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      if (action.payload.status === "reset") {
        state.notification = null;
      } else {
        state.notification = {
          status: action.payload.status,
          title: action.payload.title,
          message: action.payload.message,
        };
      }
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice; // export default uiSlice.reducer is another option but then in the store/index.js we have to delete the .reducer in the configureStore so that it looks like conficureStore({reducer: {ui: uiSlice}})
