import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Products from "../../pages/Products";
import { getProducts } from "../../services";
import { setProducts } from "../../store/productsSlice";
import { addItems, removeItem } from "../../store/cartSlice";

const products = [
  {
    id: 12,
    title:
      "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 114,
    description: "Expand your PS4 gaming experience",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    rating: {
      rate: 4.8,
      count: 400,
    },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
];

describe("Products", () => {
  vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
    useParams: vi.fn(),
  }));

  vi.mock("../../services", () => ({
    getProducts: vi.fn(),
  }));

  vi.mock("react-redux", () => ({
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  }));

  const mockUseSelector = vi.fn();
  const mockUseDispatch = vi.fn();
  const mockUseNavigate = vi.fn();

  beforeEach(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    useSelector.mockImplementation(mockUseSelector);
    useDispatch.mockReturnValue(mockUseDispatch);
    useNavigate.mockReturnValue(mockUseNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render products component", () => {
    getProducts.mockReturnValue(products);
    mockUseSelector.mockReturnValue({
      products: {
        products: [],
        mens: products,
        womens: [],
        electronics: [],
        jewellery: [],
        fetchDone: false,
        searchQuery: "",
      },
      cart: {
        cartItems: [],
      },
    });
    useParams.mockReturnValue({ category: "mens" });

    render(<Products />);

    // NavigatioFilter
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Men's")).toBeInTheDocument();
    expect(screen.getByText("Women's")).toBeInTheDocument();
    expect(screen.getByText("Electronic's")).toBeInTheDocument();
    expect(screen.getByText("Jewellery")).toBeInTheDocument();
    // ProductCard
    expect(screen.getAllByText("Hot")[0]).toBeInTheDocument();
    expect(
      screen.getByAltText(`${products[0].title}-${products[0].category}`)
    ).toBeInTheDocument();
    expect(screen.getByText(products[0].category)).toBeInTheDocument();
    expect(screen.getByText(products[0].title)).toBeInTheDocument();
    expect(screen.getByText(products[0].description)).toBeInTheDocument();
    expect(
      screen.getByText(`Available sock: ${products[0].rating.count}`)
    ).toBeInTheDocument();
    expect(screen.getByText("$40.14")).toBeInTheDocument();
    expect(screen.getByText("$22.3")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Add To Cart" })[0]
    ).toBeInTheDocument();
  });

  it("should display mens data when click on mens filter from navigation filter", () => {
    getProducts.mockReturnValue(products);

    mockUseSelector.mockReturnValue({
      products: {
        products: products,
        mens: [],
        womens: [],
        electronics: [],
        jewellery: [],
        fetchDone: false,
        searchQuery: "",
      },
      cart: {
        cartItems: [],
      },
    });

    useParams.mockReturnValue({ category: "" });

    const { rerender } = render(<Products />);

    waitFor(() => {
      expect(mockUseDispatch).toHaveBeenCalledTimes(1);
      expect(mockUseDispatch).toHaveBeenCalledWith(setProducts(products));
    });

    // NavigatioFilter
    const mens = screen.getByText("Men's");
    fireEvent.click(mens);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/products/category/mens", {
      replace: true,
    });

    mockUseSelector.mockReturnValue({
      products: {
        products: [],
        mens: products,
        womens: [],
        electronics: [],
        jewellery: [],
        fetchDone: false,
        searchQuery: "",
      },
      cart: {
        cartItems: [],
      },
    });

    rerender(<Products />);
    // ProductCard
    expect(
      screen.getByAltText(`${products[0].title}-${products[0].category}`)
    ).toBeInTheDocument();
    expect(screen.getByText(products[0].category)).toBeInTheDocument();
    expect(screen.getByText(products[0].title)).toBeInTheDocument();
    expect(
      screen.getByText(`${products[1].description.slice(0, 120)}...`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Available sock: ${products[0].rating.count}`)
    ).toBeInTheDocument();
    expect(screen.getByText("$40.14")).toBeInTheDocument();
    expect(screen.getByText("$22.3")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Add To Cart" })[0]
    ).toBeInTheDocument();
  });

  it("should display All data when click on All filter from navigation filter", () => {
    getProducts.mockReturnValue(products);

    mockUseSelector.mockReturnValue({
      products: {
        products: [],
        mens: products,
        womens: [],
        electronics: [],
        jewellery: [],
        fetchDone: false,
        searchQuery: "",
      },
      cart: {
        cartItems: [],
      },
    });
    useParams.mockReturnValue({ category: "" });

    const { rerender } = render(<Products />);

    waitFor(() => {
      expect(mockUseDispatch).toHaveBeenCalledTimes(1);
      expect(mockUseDispatch).toHaveBeenCalledWith(setProducts(products));
    });

    // NavigatioFilter
    const all = screen.getByText("All");
    fireEvent.click(all);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/products/", {
      replace: true,
    });

    mockUseSelector.mockReturnValue({
      products: {
        products: products,
        mens: [],
        womens: [],
        electronics: [],
        jewellery: [],
        fetchDone: false,
        searchQuery: "",
      },
      cart: {
        cartItems: [],
      },
    });

    rerender(<Products />);
    // ProductCard
    expect(
      screen.getByAltText(`${products[0].title}-${products[0].category}`)
    ).toBeInTheDocument();
    expect(screen.getByText(products[0].category)).toBeInTheDocument();
    expect(screen.getByText(products[0].title)).toBeInTheDocument();
    expect(
      screen.getByText(`${products[1].description.slice(0, 120)}...`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Available sock: ${products[0].rating.count}`)
    ).toBeInTheDocument();
    expect(screen.getByText("$40.14")).toBeInTheDocument();
    expect(screen.getByText("$22.3")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Add To Cart" })[0]
    ).toBeInTheDocument();
  });

  it("should display womens data when click on womens category from home page", () => {
    getProducts.mockReturnValue(products);

    mockUseSelector.mockReturnValue({
      products: {
        products: [],
        mens: [],
        womens: products,
        electronics: [],
        jewellery: [],
        fetchDone: false,
        searchQuery: "",
      },
      cart: {
        cartItems: [],
      },
    });
    useParams.mockReturnValue({ category: "womens" });

    render(<Products />);

    waitFor(() => {
      expect(mockUseDispatch).toHaveBeenCalledTimes(1);
      expect(mockUseDispatch).toHaveBeenCalledWith(setProducts(products));

      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
      expect(mockUseNavigate).toHaveBeenCalledWith("/products/catgory/womens", {
        replace: true,
      });
    });
  });

  it("should display remove from cart after clicking on add to cart button", () => {
    getProducts.mockReturnValue(products);

    mockUseSelector.mockReturnValue({
      products: {
        products: [],
        mens: [],
        womens: products,
        electronics: [],
        jewellery: [],
        fetchDone: false,
        searchQuery: "",
      },
      cart: {
        cartItems: [],
      },
    });
    useParams.mockReturnValue({ category: "womens" });

    const { rerender } = render(<Products />);

    const addToCart = screen.getAllByRole("button", { name: "Add To Cart" })[0];
    fireEvent.click(addToCart);

    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
    expect(mockUseDispatch).toHaveBeenCalledWith(addItems(products[0]));

    mockUseSelector.mockReturnValue({
      products: {
        products: [],
        mens: [],
        womens: products,
        electronics: [],
        jewellery: [],
        fetchDone: false,
        searchQuery: "",
      },
      cart: {
        cartItems: [products[0]],
      },
    });

    rerender(<Products />);

    expect(
      screen.getByRole("button", { name: "Remove From Cart" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add To Cart" })
    ).toBeInTheDocument();
  });

  it("should display add to cart after clicking on remove from cart button", () => {
    getProducts.mockReturnValue(products);

    mockUseSelector.mockReturnValue({
      products: {
        products: products,
        mens: [],
        womens: [],
        electronics: [],
        jewellery: [],
        fetchDone: false,
        searchQuery: "",
      },
      cart: {
        cartItems: [products[1]],
      },
    });
    useParams.mockReturnValue({ category: "" });

    const { rerender } = render(<Products />);

    const removeFromCart = screen.getByRole("button", {
      name: "Remove From Cart",
    });
    expect(removeFromCart).toBeInTheDocument();
    fireEvent.click(removeFromCart);

    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
    expect(mockUseDispatch).toHaveBeenCalledWith(removeItem(products[1]));

    mockUseSelector.mockReturnValue({
      products: {
        products: products,
        mens: [],
        womens: [],
        electronics: [],
        jewellery: [],
        fetchDone: false,
        searchQuery: "",
      },
      cart: {
        cartItems: [],
      },
    });

    rerender(<Products />);

    expect(
      screen.getAllByRole("button", { name: "Add To Cart" })[0]
    ).toBeInTheDocument();
  });

  it("should scroll to top on mount", () => {
    mockUseSelector.mockReturnValue({
      products: {
        products: [],
        mens: products,
        womens: [],
        electronics: [],
        jewellery: [],
        fetchDone: false,
        searchQuery: "",
      },
      cart: {
        cartItems: [products[0]],
      },
    });

    useParams.mockReturnValue({ category: "mens" });

    render(<Products />);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("should display first product when querried by title", () => {
    getProducts.mockReturnValue(products);

    mockUseSelector.mockReturnValue({
      products: {
        products: [products[0]],
        mens: [],
        womens: [],
        electronics: [],
        jewellery: [],
        fetchDone: true,
        searchQuery: "Electronics",
      },
      cart: {
        cartItems: [],
      },
    });
    useParams.mockReturnValue({ category: "" });

    render(<Products />);

    expect(screen.getByText("Hot")).toBeInTheDocument();
    expect(
      screen.getByAltText(`${products[0].title}-${products[0].category}`)
    ).toBeInTheDocument();
    expect(screen.getByText(products[0].category)).toBeInTheDocument();
    expect(screen.getByText(products[0].title)).toBeInTheDocument();
    expect(screen.getByText(products[0].description)).toBeInTheDocument();
    expect(
      screen.getByText(`Available sock: ${products[0].rating.count}`)
    ).toBeInTheDocument();
    expect(screen.getByText("$205.20")).toBeInTheDocument();
    expect(screen.getByText("$114")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Add To Cart" })[0]
    ).toBeInTheDocument();
  });

  it("should display first product when querried by category", () => {
    getProducts.mockReturnValue(products);

    mockUseSelector.mockReturnValue({
      products: {
        products: [products[0]],
        mens: [],
        womens: [],
        electronics: [],
        jewellery: [],
        fetchDone: true,
        searchQuery: "PS4",
      },
      cart: {
        cartItems: [],
      },
    });
    useParams.mockReturnValue({ category: "" });

    render(<Products />);

    expect(screen.getByText("Hot")).toBeInTheDocument();
    expect(
      screen.getByAltText(`${products[0].title}-${products[0].category}`)
    ).toBeInTheDocument();
    expect(screen.getByText(products[0].category)).toBeInTheDocument();
    expect(screen.getByText(products[0].title)).toBeInTheDocument();
    expect(screen.getByText(products[0].description)).toBeInTheDocument();
    expect(
      screen.getByText(`Available sock: ${products[0].rating.count}`)
    ).toBeInTheDocument();
    expect(screen.getByText("$205.20")).toBeInTheDocument();
    expect(screen.getByText("$114")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Add To Cart" })[0]
    ).toBeInTheDocument();
  });
});
