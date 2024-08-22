import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Cart from "../../pages/Cart";
import { useNavigate } from "react-router-dom";

const cartItems = [
  {
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  },
];

describe("Cart", () => {
  vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(),
  }));

  vi.mock("react-redux", () => ({
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  }));

  const mockUseSelector = vi.fn();
  const mockUseDispatch = vi.fn();
  const mockUseNavigate = vi.fn();

  beforeEach(() => {
    useSelector.mockImplementation(mockUseSelector);
    useDispatch.mockReturnValue(mockUseDispatch);
    useNavigate.mockReturnValue(mockUseNavigate);
  });

  afterEach(() => vi.clearAllMocks());

  it("should render cart component", () => {
    mockUseSelector.mockReturnValue({
      cartItems,
      totalAmount: 200,
      numberOfItems: 2,
      discountAmount: 100,
      shippingCost: 5,
      convenienceFee: 4.99,
    });

    render(<Cart />);
    //cartItems
    expect(
      screen.getByRole("img", { name: cartItems[0].title })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Mens Casual Premium Slim Fit T-Shirts")
    ).toBeInTheDocument();
    expect(screen.getByText("Original price:")).toBeInTheDocument();
    expect(screen.getByText("$40.14")).toBeInTheDocument();
    expect(screen.getByText("Sale price:")).toBeInTheDocument();
    expect(screen.getByText("$22.30")).toBeInTheDocument();
    expect(
      screen.getByText(`${cartItems[0].description.slice(0, 200)}...`)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remove From Cart" })
    ).toBeInTheDocument();

    //cartSummary
    expect(screen.getByText("PRODUCTS DETAILS (2 Items)")).toBeInTheDocument();
    expect(screen.getByText("Total Cost")).toBeInTheDocument();
    expect(screen.getByText("$200")).toBeInTheDocument();
    expect(screen.getByText("Discount on MRP")).toBeInTheDocument();
    expect(screen.getByText("-$100")).toBeInTheDocument();
    expect(screen.getByText("Convenience Fee")).toBeInTheDocument();
    expect(screen.getByText("$4.99")).toBeInTheDocument();
    expect(screen.getByText("Shipping Fee")).toBeInTheDocument();
    expect(screen.getByText("$5")).toBeInTheDocument();
    expect(screen.getByText("Total Amount")).toBeInTheDocument();
    expect(screen.getByText("$209.99")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "PLACE ORDER" })
    ).toBeInTheDocument();
  });

  it("should render  cart component with full description", () => {
    mockUseSelector.mockReturnValue({
      cartItems: [{ ...cartItems[0], description: "shortCartDescription" }],
      totalAmount: 200,
      numberOfItems: 2,
      discountAmount: 100,
      shippingCost: 5,
      convenienceFee: 4.99,
    });

    render(<Cart />);

    expect(screen.getByText("shortCartDescription")).toBeInTheDocument();
  });

  it("should render noCartItems component when there are no itsm in cart", () => {
    mockUseSelector.mockReturnValue({
      cartItems: [],
    });

    render(<Cart />);

    expect(
      screen.getByText("You haven't added any products to cart.")
    ).toBeInTheDocument();
  });

  it("should call dispatch when remove from cart button is clicked", () => {
    mockUseSelector.mockReturnValue({
      cartItems,
      totalAmount: 200,
      numberOfItems: 2,
      discountAmount: 100,
      shippingCost: 5,
      convenienceFee: 4.99,
    });

    render(<Cart />);

    const button = screen.getByRole("button", { name: "Remove From Cart" });
    fireEvent.click(button);

    expect(mockUseDispatch).toHaveBeenCalledOnce();
  });

  it("should navigate to checkoi=ut page on click of place order", () => {
    mockUseSelector.mockReturnValue({
      cartItems,
      totalAmount: 200,
      numberOfItems: 2,
      discountAmount: 100,
      shippingCost: 5,
      convenienceFee: 4.99,
    });

    render(<Cart />);

    const button = screen.getByRole("button", { name: "PLACE ORDER" });
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/my-store/checkout");
  });
});
