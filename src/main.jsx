import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import router from "./routes/routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={() => <h1>Loading...</h1>}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>
);
