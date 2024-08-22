import { describe, it, expect } from "vitest";
import cartReducer, { addItems, removeItem } from "../../store/cartSlice";

describe("cartSlice reducers", () => {
  it("should add an item to the cart and update cart state correctly", () => {
    const initialState = {
      totalAmount: 0,
      numberOfItems: 0,
      cartItems: [],
      discountAmount: 0,
      shippingCost: 0,
      convenienceFee: 4.99,
    };

    const newItem = { id: 1, price: 100 };

    const newState = cartReducer(initialState, addItems(newItem));

    expect(newState.cartItems.length).toBe(1);
    expect(newState.numberOfItems).toBe(1);
    expect(newState.totalAmount).toBe(100.0);
    expect(newState.discountAmount).toBe(80.0);
    expect(newState.shippingCost).toBe(10.0);
  });

  it("should remove an item from the cart and update cart state correctly", () => {
    const initialState = {
      totalAmount: 200.0,
      numberOfItems: 2,
      cartItems: [
        { id: 1, price: 100.0 },
        { id: 2, price: 100.0 },
      ],
      discountAmount: 160.0,
      shippingCost: 20.0,
      convenienceFee: 4.99,
    };

    const itemToRemove = { id: 1, price: 100.0 };

    const newState = cartReducer(initialState, removeItem(itemToRemove));

    expect(newState.cartItems.length).toBe(1);
    expect(newState.numberOfItems).toBe(1);
    expect(newState.totalAmount).toBe(100.0);
    expect(newState.discountAmount).toBe(80.0);
    expect(newState.shippingCost).toBe(10.0);
  });
});
