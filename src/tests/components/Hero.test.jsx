import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Hero from "../../components/Hero";

describe("Hero", () => {
  vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(),
  }));

  const mockUseNavigate = vi.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockUseNavigate);
  });

  afterEach(() => vi.resetAllMocks());

  it("should render Hero component", () => {
    render(<Hero />);
    expect(screen.getByText("Tee Collection 2024")).toBeInTheDocument();
    expect(screen.getByText("NEW SEASON")).toBeInTheDocument();
    expect(screen.getByText("SHOP NOW")).toBeInTheDocument();
    expect(screen.getByAltText("human-image")).toBeInTheDocument();
  });

  it("should navigate to / on button click", () => {
    render(<Hero />);

    const button = screen.getByText("SHOP NOW");
    button.click();

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/", {
      state: { scrollToCategory: true },
    });
  });
});
