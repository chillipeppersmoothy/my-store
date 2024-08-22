/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import "../App.css";
import { removeItem } from "../store/cartSlice";

const CartItem = ({ cartItem }) => {
  const { image, title, price, description } = cartItem;
  const dispatch = useDispatch();

  return (
    <div className="cart-list-cont">
      <img src={image} alt={title} className="cart-img" />
      <div id="cart-text">
        <h2 className="cart-item-h2">{title}</h2>
        <h3>
          <span>Original price: </span>
          <span className="cart-item-h3">${(price * 1.8).toFixed(2)}</span>
        </h3>
        <h1 className="cart-item-h1">
          <span>Sale price: </span>${price.toFixed(2)}
        </h1>
        <h4 className="cart-item-h4">
          {description.length > 200
            ? `${description.slice(0, 200)}...`
            : description}
        </h4>
        <button
          className="remove-from-cart"
          onClick={() => dispatch(removeItem(cartItem))}
        >
          Remove From Cart
        </button>
      </div>
    </div>
  );
};

export default CartItem;
