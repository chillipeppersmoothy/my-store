import { useSelector } from "react-redux";
import "../App.css";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const navigate = useNavigate();
  const {
    numberOfItems,
    totalAmount,
    discountAmount,
    shippingCost,
    convenienceFee,
  } = useSelector((state) => state.cart);

  return (
    <div className="cart-summary-cont">
      <div className="cart-details-cont">
        <div className="price-header">
          PRODUCTS DETAILS ({numberOfItems} Items){" "}
        </div>
        <div className="price-item">
          <span className="price-item-tag">Total Cost</span>
          <span className="price-item-value">${totalAmount}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -${discountAmount}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">${convenienceFee}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Shipping Fee</span>
          <span className="price-item-value">${shippingCost}</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">
            $
            {(
              Number(totalAmount) +
              Number(convenienceFee) +
              Number(shippingCost)
            ).toFixed(2)}
          </span>
        </div>
      </div>
      <button
        className="cart-summary-button"
        onClick={() => navigate("/my-store/checkout")}
      >
        <div className="css-xjhrni">PLACE ORDER</div>
      </button>
    </div>
  );
};

export default CartSummary;
