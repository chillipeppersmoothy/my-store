import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CategoryCard from "../../components/CategoryCard";
import { useNavigate } from "react-router-dom";

describe("CategoryCard", () => {
  vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(),
  }));

  const mockUseNavigate = vi.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockUseNavigate);
  });

  const props = {
    imgSrc:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    title: "Men's",
  };
  afterEach(() => vi.clearAllMocks());

  it("should render thet ProductCard component", () => {
    render(<CategoryCard {...props} />);

    expect(
      screen.getByRole("img", { name: "category-img" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: props.title }));
  });

  it("should navigate to mens category on click on the button", () => {
    render(<CategoryCard {...props} />);

    const button = screen.getByRole("button", { name: props.title });
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/products/category/mens");
  });

  it("should navigate to womens category on click on the button", () => {
    const womensProps = { ...props, title: "Women's" };

    render(<CategoryCard {...womensProps} />);

    const button = screen.getByRole("button", { name: womensProps.title });
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith("/products/category/womens");
  });

  it("should navigate to mens category on click on the button", () => {
    const electronicsProps = { ...props, title: "Electronics" };
    render(<CategoryCard {...electronicsProps} />);

    const button = screen.getByRole("button", { name: electronicsProps.title });
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith(
      "/products/category/electronics"
    );
  });

  it("should navigate to mens category on click on the button", () => {
    const jewelleryProps = { ...props, title: "Jewellery" };
    render(<CategoryCard {...jewelleryProps} />);

    const button = screen.getByRole("button", { name: jewelleryProps.title });
    fireEvent.click(button);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith(
      "/products/category/jewellery"
    );
  });
});
