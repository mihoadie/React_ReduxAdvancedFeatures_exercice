import { uiActions } from "./uiSlice";
import { cartActions } from "./cartSlice";

// step 0: create a THUNK FUNCTION that will generate async function execution (like fetching!) and then manage redux (as we can not
// reduce store (modify it) with async function, only with synchronous actions!)
export const sendCartData = (cart) => {
  return async (dispatch) => {
    // step 1: notify ser that we start the request
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Loading",
        message: "sending request to server",
      })
    );
    // step 2: define our fetch request
    const sendRequest = async () => {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            cart,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending Cart Data Failed");
      }
    };
    // step 3: try our fetch request defined here above
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Successfully transmitted !",
          message: "cart is correctly updated in the database",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }
    // step 4: the end
  };
};

// STEP 0: PREPARE ANOTHER THUNK FUNCTION TO FETCH AND GET THE CART
export const getCartData = (cart) => {
  return async (dispatch) => {
    // step 1: notify user that we start the request
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Loading",
        message: "Collecting data from the server",
      })
    );
    // step 2: define our fetch request
    const getRequest = async () => {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "cart.json",
        { method: "GET" }
      );
      if (!response.ok) {
        throw new Error("Getting Cart Data Failed");
      }
      const dataResponse = await response.json();
      return dataResponse;
    };
    // step 3: try our fetch request defined here above
    try {
      const result = await getRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Data Successfully Collected !",
          message: "cart is correctly collected from the database",
        })
      );
      console.log(result["cart"]);
      dispatch(cartActions.replaceCart(result["cart"])); // on vient modifier notre state redux avec les données recupérées!
      console.log("data collected!!");
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }
    // step 4: the end
  };
};
