import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartItems = useSelector((state) => {
    return state.cart.items;
  });
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.length > 0 &&
          cartItems.map((element) => (
            <CartItem
              key={element.itemId}
              item={{
                title: element.name,
                quantity: element.quantity,
                total: element.totalPrice,
                price: element.price,
                id: element.itemId,
              }}
            />
          ))}
      </ul>
    </Card>
  );
};

export default Cart;
