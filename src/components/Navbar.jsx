import { AiOutlineSearch } from "react-icons/ai";
import { HiShoppingCart } from "react-icons/hi";
import "./styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterData } from "../store/productsSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleNavigationScroll = () => {
    navigate("/my-store/", { state: { scrollToCategory: true } });
  };
  const state = useSelector((state) => state);

  return (
    <nav>
      <div className="nav-cont-1">
        <Link to="/my-store/">
          <h2 className="nav-h2">
            My-<span style={{ fontWeight: "400" }}>store</span>
          </h2>
        </Link>
        <ul className="nav-ul">
          <Link to="/my-store/products" style={{ color: "black" }}>
            Products
          </Link>
          <span
            className="about-span"
            style={{ color: "black" }}
            onClick={() => handleNavigationScroll()}
          >
            Shop
          </span>
          <Link to="/my-store/about" style={{ color: "black" }}>
            About
          </Link>
        </ul>
      </div>
      {location.pathname === "/my-store/products" ? (
        <div className="search_bar">
          <span className="material-symbols-outlined search_icon">
            <AiOutlineSearch
              size={25}
              style={{
                marginRight: "5px",
                marginLeft: "15px",
              }}
            />
          </span>
          <input
            className="search_input"
            placeholder="Search for products, brands and more"
            onChange={(e) => dispatch(filterData(e.target.value))}
          />
        </div>
      ) : (
        <></>
      )}

      <div className="nav-cont-2">
        {!state.login.isLoggedIn && (
          <button
            className="login-nav"
            onClick={() =>
              navigate("/my-store/login", {
                state: { path: location.pathname },
              })
            }
          >
            Login
          </button>
        )}

        <Link to="/my-store/cart" className="cart-icon-cont">
          <span className="nav-cart-count">{state.cart.numberOfItems}</span>
          <HiShoppingCart
            size={25}
            style={{
              marginRight: "10px",
              marginLeft: "15px",
              marginBottom: "-5px",
            }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
