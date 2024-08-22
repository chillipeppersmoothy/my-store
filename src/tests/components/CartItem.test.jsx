import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CartItem from "../../components/CartItem";

const cartItem = {
  image:
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  title: "Mens Casual Premium Slim Fit T-Shirts",
  price: 22.3,
  description:
    "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
};

describe("CartItem", () => {
  vi.mock("react-redux", () => ({
    useDispatch: vi.fn(),
  }));

  const mockUseDispatch = vi.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockUseDispatch);
  });

  afterEach(() => vi.resetAllMocks());

  it("should render CartItem component", () => {
    render(<CartItem cartItem={cartItem} />);

    expect(
      screen.getByRole("img", { name: cartItem.title })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Mens Casual Premium Slim Fit T-Shirts")
    ).toBeInTheDocument();
    expect(screen.getByText("Original price:")).toBeInTheDocument();
    expect(screen.getByText("$40.14")).toBeInTheDocument();
    expect(screen.getByText("Sale price:")).toBeInTheDocument();
    expect(screen.getByText("$22.30")).toBeInTheDocument();
    expect(
      screen.getByText(`${cartItem.description.slice(0, 200)}...`)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remove From Cart" })
    ).toBeInTheDocument();
  });

  it("should render CartItem component with full description", () => {
    const shortCartDescription = { ...cartItem, description: "a" };
    render(<CartItem cartItem={shortCartDescription} />);

    expect(
      screen.getByText(shortCartDescription.description)
    ).toBeInTheDocument();
  });

  it("should call dispatch when remove from cart button is clicked", () => {
    render(<CartItem cartItem={cartItem} />);

    const button = screen.getByRole("button", { name: "Remove From Cart" });
    fireEvent.click(button);

    expect(mockUseDispatch).toHaveBeenCalledOnce();
  });
});
