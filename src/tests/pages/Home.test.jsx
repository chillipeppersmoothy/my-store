import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "../../pages/Home";

describe("Home", () => {
  vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
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
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("should render home componenet", () => {
    useLocation.mockReturnValue({
      state: { scrollToCategory: true },
    });

    render(<Home />);
    // Hero
    expect(screen.getByText("Tee Collection 2024")).toBeInTheDocument();
    expect(screen.getByText("NEW SEASON")).toBeInTheDocument();
    expect(screen.getByText("SHOP NOW")).toBeInTheDocument();
    expect(screen.getByAltText("human-image")).toBeInTheDocument();

    // Categories
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("Men's")).toBeInTheDocument();
    expect(screen.getByText("Women's")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Jewellery")).toBeInTheDocument();
  });

  it("should scroll to categories on click of shop now", () => {
    render(<Home />);

    const button = screen.getByText("SHOP NOW");
    button.click();

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/", {
      state: { scrollToCategory: true },
    });
  });

  it("should navigate to mens category on click on the button", () => {
    render(<Home />);

    const button = screen.getByRole("button", { name: "Men's" });
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/products/category/mens");
  });

  it("should navigate to womens category on click on the button", () => {
    render(<Home />);

    const button = screen.getByRole("button", { name: "Women's" });
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/products/category/womens");
  });

  it("should navigate to mens category on click on the button", () => {
    render(<Home />);

    const button = screen.getByRole("button", { name: "Electronics" });
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith(
      "/products/category/electronics"
    );
  });

  it("should navigate to mens category on click on the button", () => {
    render(<Home />);

    const button = screen.getByRole("button", { name: "Jewellery" });
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith(
      "/products/category/jewellery"
    );
  });

  it("scrolls to category section when scrollToCategory is true", () => {
    useLocation.mockReturnValue({ state: { scrollToCategory: true } });
    const scrollIntoViewMock = vi.fn();
    render(<Home />);

    const categorySection = screen.getByTestId("categoryScroll");
    categorySection.scrollIntoView = scrollIntoViewMock;

    vi.advanceTimersByTime(300);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });
  });
});
