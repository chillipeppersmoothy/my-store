import { describe, expect, it } from "vitest";
import About from "../../pages/About";
import { render, screen } from "@testing-library/react";

describe("About", () => {
  it("should render about component", () => {
    render(<About />);

    expect(screen.getByText("About us page.")).toBeInTheDocument();
    expect(
      screen.getByText(/This is a simple website based react/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The state management is done using/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The unit tests have been written using/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The website is using dummy API's from/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "vite" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "redux" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "@reduxjs/toolkit" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "vitest" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "fakestoreapi.com" })
    ).toBeInTheDocument();
  });
});
