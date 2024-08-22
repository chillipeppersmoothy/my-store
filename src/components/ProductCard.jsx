/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { addItems, removeItem } from "../store/cartSlice";

const ProductCard = ({ product }) => {
  const { id, rating, image, category, title, description, price } = product;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const inCart = state.cart.cartItems.find((item) => item.id === id);

  return (
    <div className="product-card">
      {rating.rate > 3.9 ? <div className="badge">Hot</div> : null}
      <div className="product-tumb">
        <img src={image} alt={`${title}-${category}`} />
      </div>
      <div className="product-details">
        <span className="product-catagory">{category}</span>
        <h4>
          <a href="##">{title}</a>
        </h4>
        <h4>
          <small>Available sock: {rating.count}</small>
        </h4>
        <p>
          {description.length > 120
            ? description.substring(0, 120) + "..."
            : description}
        </p>
        <div className="product-bottom-details">
          <div className="product-price">
            <small>${(price * 1.8).toFixed(2)}</small>${price}
          </div>

          <div className="product-links">
            {!inCart ? (
              <button
                className="addCart-link"
                onClick={() => dispatch(addItems(product))}
              >
                Add To Cart
              </button>
            ) : (
              <button
                className="removeCart-link"
                onClick={() => dispatch(removeItem(product))}
              >
                Remove From Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
