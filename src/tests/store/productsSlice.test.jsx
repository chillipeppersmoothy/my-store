import { describe, it, expect } from "vitest";
import productsReducer, {
  fetched,
  filterData,
  setProducts,
} from "../../store/productsSlice";

describe("productsSlice reducers", () => {
  const initialState = {
    products: [],
    mens: [],
    womens: [],
    electronics: [],
    jewellery: [],
    fetchDone: false,
    searchQuery: "",
  };

  it("should set products and categorize them correctly", () => {
    const mockProducts = [
      { id: 1, category: "men's clothing" },
      { id: 2, category: "women's clothing" },
      { id: 3, category: "electronics" },
      { id: 4, category: "jewelery" },
    ];

    const newState = productsReducer(initialState, setProducts(mockProducts));

    expect(newState.products).toEqual(mockProducts);
    expect(newState.mens).toEqual([{ id: 1, category: "men's clothing" }]);
    expect(newState.womens).toEqual([{ id: 2, category: "women's clothing" }]);
    expect(newState.electronics).toEqual([{ id: 3, category: "electronics" }]);
    expect(newState.jewellery).toEqual([{ id: 4, category: "jewelery" }]);
  });

  it("should set fetchDone to true if products array is not empty", () => {
    const alteredInitialState = {
      ...initialState,
      products: [{ id: 1, category: "men's clothing" }],
    };

    const newState = productsReducer(alteredInitialState, fetched());

    expect(newState.fetchDone).toBe(true);
  });

  it("should not set fetchDone to true if products array is empty", () => {
    const newState = productsReducer(initialState, fetched());

    expect(newState.fetchDone).toBe(false);
  });

  it("should set the searchQuery state", () => {
    const searchQuery = "shirt";
    const newState = productsReducer(initialState, filterData(searchQuery));

    expect(newState.searchQuery).toBe(searchQuery);
  });
});
