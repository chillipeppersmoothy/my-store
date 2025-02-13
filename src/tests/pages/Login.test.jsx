import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Login from "../../pages/Login";
import { authenticateUser } from "../../services";
import { authenticate } from "../../store/loginSlice";

describe("Login", () => {
  vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  }));

  vi.mock("../../services", () => ({
    authenticateUser: vi.fn(),
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

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render login component", () => {
    render(<Login />);

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("should authenticate successfully and navigate to /cart when clicked on login button from cart page", () => {
    const mockUseLocation = { state: { path: "/cart" } };

    const mockUser = { email: "test@example.com", password: "test123" };
    authenticateUser.mockReturnValue([mockUser]);
    useLocation.mockReturnValue(mockUseLocation);

    render(<Login />);

    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    const submit = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(email, { target: { value: "test@example.com" } });
    fireEvent.change(password, { target: { value: "test123" } });
    fireEvent.click(submit);

    waitFor(() => {
      expect(mockUseDispatch).toHaveBeenCalledTimes(1);
      expect(mockUseDispatch).toHaveBeenCalledWith(authenticate(mockUser));
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
      expect(mockUseNavigate).toHaveBeenCalledWith("/cart");
    });
  });

  it("should authenticate successfully and navigate to / when clicked on login button from home page", () => {
    const mockUser = { email: "test@example.com", password: "test123" };
    authenticateUser.mockReturnValue([mockUser]);
    useLocation.mockReturnValue({});

    render(<Login />);

    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    const submit = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(email, { target: { value: "test@example.com" } });
    fireEvent.change(password, { target: { value: "test123" } });
    fireEvent.click(submit);

    waitFor(() => {
      expect(mockUseDispatch).toHaveBeenCalledTimes(1);
      expect(mockUseDispatch).toHaveBeenCalledWith(authenticate(mockUser));
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
      expect(mockUseNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("should display error message when authenticateUser fails", () => {
    authenticateUser.mockResolvedValue([]);

    render(<Login />);

    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    const submit = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(email, { target: { value: "test@example.com" } });
    fireEvent.change(password, { target: { value: "test123" } });
    fireEvent.click(submit);

    waitFor(() => {
      expect(
        screen.getByText("Email or Password is Invalid")
      ).toBeInTheDocument();
      expect(mockUseDispatch).not.toHaveBeenCalled();
    });
  });
});
