const navigateMock = vi.fn();

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Navbar from "../../components/Navbar";
import { filterData } from "../../store/productsSlice";

describe("Navbar", () => {
  vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useNavigate: () => navigateMock,
      useLocation: vi.fn(),
    };
  });

  vi.mock("react-redux", () => ({
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  }));

  const mockUseSelector = vi.fn();
  const mockUseDispatch = vi.fn();
  const mockUseLocation = vi.fn();

  beforeEach(() => {
    useSelector.mockImplementation(mockUseSelector);
    useDispatch.mockReturnValue(mockUseDispatch);
    useLocation.mockReturnValue(mockUseLocation);
  });

  afterEach(() => vi.clearAllMocks());

  it("should render CartItem component", () => {
    useSelector.mockReturnValue({
      login: { isLoggedIn: false },
      cart: { numberOfItems: 2 },
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "My- store" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2" })).toBeInTheDocument();
  });

  it("should navigate to shop when clicked on shop button", () => {
    useSelector.mockReturnValue({
      login: { isLoggedIn: false },
      cart: { numberOfItems: 2 },
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const button = screen.getByText("Shop");
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith("/my-store/", {
      state: { scrollToCategory: true },
    });
  });

  it("should navigate to /my-store/login on click of login button", () => {
    useSelector.mockReturnValue({
      login: { isLoggedIn: false },
      cart: { numberOfItems: 2 },
    });

    useLocation.mockReturnValue({ pathname: "/my-store/" });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: "Login" });
    fireEvent.click(button);

    expect(navigateMock).toBeCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith("/my-store/login", {
      state: { path: "/my-store/" },
    });
  });

  it("should not display login button when already logged in", () => {
    useSelector.mockReturnValue({
      login: { isLoggedIn: true },
      cart: { numberOfItems: 2 },
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });

  it("should navigate to /my-store/ on click of my-store link", () => {
    useSelector.mockReturnValue({
      login: { isLoggedIn: false },
      cart: { numberOfItems: 2 },
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const button = screen.getByRole("link", { name: "My- store" });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    waitFor(() => {
      expect(navigateMock).toBeCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith("/my-store/");
    });
  });

  it("should navigate to /my-store/products on click of products link", () => {
    useSelector.mockReturnValue({
      login: { isLoggedIn: false },
      cart: { numberOfItems: 2 },
    });

    useLocation.mockReturnValue({ pathname: "/my-store/products" });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const button = screen.getByRole("link", { name: "Products" });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    waitFor(() => {
      expect(navigateMock).toBeCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith("/my-store/products");
    });

    const inputBox = screen.getByPlaceholderText(
      "Search for products, brands and more"
    );
    expect(inputBox).toBeInTheDocument();
    fireEvent.change(inputBox, { target: { value: "search" } });

    expect(mockUseDispatch).toHaveBeenCalledTimes(1);
    expect(mockUseDispatch).toHaveBeenCalledWith(filterData("search"));
  });

  it("should navigate to /my-store/about on click of about link", () => {
    useSelector.mockReturnValue({
      login: { isLoggedIn: false },
      cart: { numberOfItems: 2 },
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const button = screen.getByRole("link", { name: "About" });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    waitFor(() => {
      expect(navigateMock).toBeCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith("/my-store/about");
    });
  });

  it("should navigate to /my-store/cart on click of cart link", () => {
    useSelector.mockReturnValue({
      login: { isLoggedIn: false },
      cart: { numberOfItems: 2 },
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const button = screen.getByRole("link", { name: "2" });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    waitFor(() => {
      expect(navigateMock).toBeCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith("/my-store/cart");
    });
  });
});
