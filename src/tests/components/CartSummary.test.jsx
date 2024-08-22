import { fireEvent, render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CartSummary from "../../components/CartSummary";

describe("CartSummary", () => {
  vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(),
  }));

  vi.mock("react-redux", () => ({
    useSelector: vi.fn(),
  }));

  const mockUseSelector = vi.fn();
  const mockUseNavigate = vi.fn();

  beforeEach(() => {
    useSelector.mockImplementation(mockUseSelector);
    useNavigate.mockReturnValue(mockUseNavigate);
  });

  afterEach(() => vi.resetAllMocks());

  it("should render the NavigatioFilter componenet", () => {
    mockUseSelector.mockReturnValue({
      totalAmount: 200,
      numberOfItems: 2,
      discountAmount: 100,
      shippingCost: 5,
      convenienceFee: 4.99,
    });

    render(<CartSummary />);

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

  it("should navigate to checkoi=ut page on click of place order", () => {
    mockUseSelector.mockReturnValue({
      totalAmount: 200,
      numberOfItems: 2,
      discountAmount: 100,
      shippingCost: 5,
      convenienceFee: 4.99,
    });

    render(<CartSummary />);

    const button = screen.getByRole("button", { name: "PLACE ORDER" });
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/my-store/checkout");
  });
});
