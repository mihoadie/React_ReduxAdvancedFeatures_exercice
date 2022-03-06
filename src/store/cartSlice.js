import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  totalQuantity: 0,
  changed: false, // to manage and avoid systematic GetCartRequest+SendCartRequest at the same time, managed via boolean (those 2 thunk action being in cart-actions.js and being called in app useEffects)
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((el) => el.itemId === item.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + item.price;
      } else {
        state.items.push({
          itemId: item.id,
          name: item.title,
          price: item.price,
          quantity: 1,
          totalPrice: item.price,
        });
      }
      state.totalQuantity++; // because in this case, as we can only add one by one the products, then if product does not exist, quantity is 1
      state.changed = true;
    },
    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((el) => el.itemId === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((el) => el.itemId !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price; // total - its own price
      }
      state.totalQuantity--;
      state.changed = true;
    },
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice; // export default cartSlice.reducer is another option but then in the store/index.js we have to delete the .reducer in the configureStore so that it looks like conficureStore({reducer: {cart: cartSlice}})
