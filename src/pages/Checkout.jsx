import { useSelector } from "react-redux";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Checkout = () => {
  const state = useSelector((state) => state);
  const cart = state.cart;
  const login = state.login;
  const navigate = useNavigate();

  useEffect(() => {
    if (!login?.isLoggedIn)
      navigate("/my-store/login", { state: { path: "/my-store/checkout" } });
  });

  return (
    <div className="checkout-cont">
      <h1>Checkout</h1>
      {login?.userInfo && cart.cartItems ? (
        <div className="checkout-summary-cont">
          <h2> Total: ${cart.totalAmount.toFixed(2)}</h2>
          <h5>Shipping Cost: ${cart.shippingCost}</h5>
          <h5>Total Items: {cart.numberOfItems}</h5>
          <h5>
            Shipping Address{" "}
            <span className="text-purple">
              {login.userInfo.address?.number} {login.userInfo.address?.street}{" "}
              {login.userInfo.address?.city}{" "}
            </span>
          </h5>
          <h5>
            Zip Code:{" "}
            <span className="text-purple">
              {login.userInfo.address?.zipcode}
            </span>
          </h5>
          <h5>
            Contact Number:{" "}
            <span className="text-purple">{login.userInfo.phone}</span>
          </h5>
          <h5>
            Biller:{" "}
            <span className="text-purple">
              {login.userInfo.name?.firstname} {login.userInfo.name?.lastname}
            </span>
          </h5>
          <button style={{ alignSelf: "center", width: "100%" }}>
            Pay Now
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Checkout;
