import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { sendCartData } from "./store/cart-actions";
import { getCartData } from "./store/cart-actions";
import Notification from "./components/UI/Notification";
import React from "react";

let isInitial = true;

function App() {
  const cartVisible = useSelector((state) => state.ui.cartIsVisible);
  const overallCart = useSelector((state) => state.cart);
  // we get the state value of the cart, and put it in a constant
  // each time the state changes, it changes the value of overallCart...so the useEffect, which has overallCart as dependancie, re run!
  // so each time we move the state, an async function  is then sent to the database, to fecth PUT and modify the associated database value with the brand updated cart!

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (overallCart.changed) {
      dispatch(sendCartData(overallCart));
    }
  }, [overallCart, dispatch]);

  return (
    <React.Fragment>
      {notifications && (
        <Notification
          status={notifications.status}
          message={notifications.message}
          title={notifications.title}
        />
      )}
      <Layout>
        {cartVisible && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
