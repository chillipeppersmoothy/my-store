import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProductCard from "../../components/ProductCard";

const product = {
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
};

describe("ProductCard", () => {
  vi.mock("react-redux", () => ({
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  }));

  const mockUseSelector = vi.fn();
  const mockUseDispatch = vi.fn();

  beforeEach(() => {
    useSelector.mockImplementation(mockUseSelector);
    useDispatch.mockReturnValue(mockUseDispatch);
  });

  afterEach(() => vi.clearAllMocks());

  it("should render thet ProductCard component", () => {
    mockUseSelector.mockReturnValue({ cart: { cartItems: [] } });

    render(<ProductCard product={product} />);

    expect(screen.getByText("Hot")).toBeInTheDocument();
    expect(screen.getByRole("img"));
    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(
      screen.getByText(/Mens Casual Premium Slim Fit T-Shirts/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable ..."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Available sock: ${product.rating.count}`)
    ).toBeInTheDocument();
    expect(screen.getByText("$40.14")).toBeInTheDocument();
    expect(screen.getByText("$22.3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add To Cart" }));
  });

  it("should render thet ProductCard component with entire description", () => {
    mockUseSelector.mockReturnValue({ cart: { cartItems: [] } });

    render(
      <ProductCard product={{ ...product, description: "a description" }} />
    );

    expect(screen.getByText("a description")).toBeInTheDocument();
  });

  it("should add item to cart when button is clicked and display remove from cart button", () => {
    mockUseSelector.mockReturnValue({ cart: { cartItems: [] } });

    const { rerender } = render(<ProductCard product={product} />);

    const addButton = screen.getByText("Add To Cart");
    fireEvent.click(addButton);

    mockUseSelector.mockReturnValue({ cart: { cartItems: [product] } });

    rerender(<ProductCard product={product} />);

    screen.getByText("Remove From Cart");
  });

  it("should remove item from cart when button is clicked and displays add to cart button", () => {
    mockUseSelector.mockReturnValue({ cart: { cartItems: [product] } });

    const { rerender } = render(<ProductCard product={product} />);

    const removeButton = screen.getByText("Remove From Cart");
    fireEvent.click(removeButton);

    mockUseSelector.mockReturnValue({ cart: { cartItems: [] } });

    rerender(<ProductCard product={product} />);

    screen.getByText("Add To Cart");
  });
});
