import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "../../App";
import { route } from "../../routes/routes";
import store from "./../../store/store";

describe("App Routes", () => {
  it("renders Home component for /", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<App />}>
              {route[0].children.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Tee Collection 2024")).toBeInTheDocument();
    expect(screen.getByText("NEW SEASON")).toBeInTheDocument();
    expect(screen.getByText("SHOP NOW")).toBeInTheDocument();
    expect(screen.getByAltText("human-image")).toBeInTheDocument();
  });

  it("renders Products component for /products", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/products"]}>
          <Routes>
            <Route path="/" element={<App />}>
              {route[0].children.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Men's")).toBeInTheDocument();
    expect(screen.getByText("Women's")).toBeInTheDocument();
    expect(screen.getByText("Electronic's")).toBeInTheDocument();
    expect(screen.getByText("Jewellery")).toBeInTheDocument();
  });

  it("renders Cart component for /cart", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/cart"]}>
          <Routes>
            <Route path="/" element={<App />}>
              {route[0].children.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/You haven't added any products to cart./i)
    ).toBeInTheDocument();
  });

  // Additional tests for other routes like /checkout, /login, /about, etc.
});
