/* eslint-disable react/no-unescaped-entities */
import "../App.css";

const NoCartItems = () => {
  return (
    <div className="cart-noItems">
      <h1 style={{ alignItems: "center" }}>
        You haven't added any products to cart.
      </h1>
    </div>
  );
};

export default NoCartItems;
