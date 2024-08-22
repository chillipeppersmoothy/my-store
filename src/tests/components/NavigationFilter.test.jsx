import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import NavigationFilter from "../../components/NavigationFilter";

describe("NavigationFilter", () => {
  const props = {
    displayProducts: true,
    name: "Men's",
    categoryName: "mens",
    category: false,
    setDisplayProducts: vi.fn(),
  };

  vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(),
  }));

  const mockUseNavigate = vi.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockUseNavigate);
    vi.useFakeTimers();
  });

  afterEach(() => vi.resetAllMocks());

  it("should render the NavigatioFilter componenet", () => {
    render(<NavigationFilter {...props} />);

    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.name)).toHaveClass("category-select-each");
  });

  it("should render with correct class name", () => {
    const { rerender } = render(<NavigationFilter {...props} />);
    const filterButton = screen.getByText(props.name);

    // Test for "category-select-each" class name when not selected
    expect(filterButton).toHaveClass("category-select-each");
    expect(filterButton).not.toHaveClass("selected-color");

    // Test for "selected-color" class name when selected
    const selectedProps = { ...props, displayProducts: props.name };
    rerender(<NavigationFilter {...selectedProps} />);
    const filterButtonSelected = screen.getByText(selectedProps.name);
    expect(filterButtonSelected).toHaveClass("selected-color");
    expect(filterButtonSelected).not.toHaveClass("category-select-each");
  });

  it("should call setDisplayProducts and navigates on click", async () => {
    render(<NavigationFilter {...props} />);

    const filterButton = screen.getByText(props.name);
    fireEvent.click(filterButton);

    waitFor(() => {
      expect(props.setDisplayProducts).toHaveBeenCalledTimes(1);
      expect(props.setDisplayProducts).toHaveBeenCalledWith(props.name);
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
      expect(mockUseNavigate).toHaveBeenCalledWith(
        `/my-store/products/category/${props.categoryName}`,
        {
          replace: true,
        }
      );
    });
  });

  it("should navigate to root when name is 'All'", async () => {
    const allProps = { ...props, name: "All" };

    render(<NavigationFilter {...allProps} />);

    const filterButton = screen.getByText(allProps.name);
    fireEvent.click(filterButton);

    waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
      expect(mockUseNavigate).toHaveBeenCalledWith(`/my-store/products/`, {
        replace: true,
      });
    });
  });

  it("should navigate to root when categoryName is empty", async () => {
    const emptyCategoryProps = { ...props, categoryName: "" };

    render(<NavigationFilter {...emptyCategoryProps} />);

    const filterButton = screen.getByText(emptyCategoryProps.name);
    fireEvent.click(filterButton);

    waitFor(() => {
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
      expect(mockUseNavigate).toHaveBeenCalledWith(`/my-store/products/`, {
        replace: true,
      });
    });
  });
});
