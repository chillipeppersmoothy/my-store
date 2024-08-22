import { render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Checkout from "../../pages/Checkout";
import { useNavigate } from "react-router-dom";

const cart = {
  cartItems: [
    {
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    },
  ],
  totalAmount: 22.3,
  numberOfItems: 1,
  shippingCost: 3,
};

const userInfo = {
  address: {
    number: 6454,
    street: "Hunters Creek Dr",
    city: "San Antonio",
    zipcode: "98234-1734",
  },
  name: {
    firstname: "don",
    lastname: "romer",
  },
  phone: "1-765-789-6734",
};

describe("Checkout", () => {
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

  it("should render checkout comoponent", () => {
    mockUseSelector.mockReturnValue({
      cart,
      login: {
        isLoggedIn: true,
        userInfo,
      },
    });

    render(<Checkout />);

    expect(screen.getByText("Checkout")).toBeInTheDocument();
    expect(screen.getByText("Total: $22.30")).toBeInTheDocument();
    expect(screen.getByText("Shipping Cost: $3")).toBeInTheDocument();
    expect(screen.getByText("Total Items: 1")).toBeInTheDocument();
    expect(screen.getByText("Shipping Address")).toBeInTheDocument();
    expect(
      screen.getByText("6454 Hunters Creek Dr San Antonio")
    ).toBeInTheDocument();
    expect(screen.getByText("Zip Code:")).toBeInTheDocument();
    expect(screen.getByText("98234-1734")).toBeInTheDocument();
    expect(screen.getByText("Contact Number:")).toBeInTheDocument();
    expect(screen.getByText("1-765-789-6734")).toBeInTheDocument();
    expect(screen.getByText("Biller:")).toBeInTheDocument();
    expect(screen.getByText("don romer")).toBeInTheDocument();
    expect(screen.getByText("Pay Now")).toBeInTheDocument();
  });

  it("should navigate to login page when user has not logged in", () => {
    mockUseSelector.mockResolvedValue({
      cart,
      login: {
        isLoggedIn: false,
      },
    });

    render(<Checkout />);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/my-store/login", {
      state: { path: "/my-store/checkout" },
    });
  });
});
