import { useSelector } from "react-redux";
import NoCartItems from "../components/NoCartItems";
import "../App.css";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

const Cart = () => {
  const state = useSelector((state) => state.cart);
  return (
    <div>
      {state.cartItems?.length > 0 ? (
        <div className="cart-page">
          <div className="cart-items-cont">
            {state?.cartItems?.map((cartItem) => (
              <CartItem cartItem={cartItem} key={cartItem.id} />
            ))}
          </div>
          <CartSummary />
        </div>
      ) : (
        <NoCartItems />
      )}
    </div>
  );
};

export default Cart;
