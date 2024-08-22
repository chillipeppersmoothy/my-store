import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import About from "../pages/About";

export const route = [
  {
    path: "/my-store/",
    element: <App />,
    children: [
      {
        path: "/my-store/",
        element: <Home />,
      },
      {
        path: "/my-store/products",
        element: <Products />,
      },
      {
        path: "/my-store/products/category/:category?",
        element: <Products />,
      },
      {
        path: "/my-store/about",
        element: <About />,
      },
      {
        path: "/my-store/cart",
        element: <Cart />,
      },
      {
        path: "/my-store/checkout",
        element: <Checkout />,
      },
      {
        path: "/my-store/login",
        element: <Login />,
      },
    ],
  },
];

const router = createBrowserRouter(route, { initialEntries: ["/my-store/"] });

export default router;
