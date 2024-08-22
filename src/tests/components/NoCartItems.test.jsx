import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NoCartItems from "../../components/NoCartItems";

describe("NoCartItems", () => {
  it("should display no Items text", () => {
    render(<NoCartItems />);

    expect(screen.getByText("You haven't added any products to cart."));
  });
});
