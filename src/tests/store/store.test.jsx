import { describe, it, expect } from "vitest";
import store from "../../store/store";
import cartReducer, { addItems, removeItem } from "../../store/cartSlice";
import productsReducer, {
  fetched,
  filterData,
  setProducts,
} from "../../store/productsSlice";
import loginReducer, { authenticate } from "../../store/loginSlice";

describe("Redux Store", () => {
  it("should have the correct initial state for products slice", () => {
    const state = store.getState().products;

    expect(state).toEqual(productsReducer(undefined, { type: "@@INIT" }));
  });

  it("should have the correct initial state for cart slice", () => {
    const state = store.getState().cart;

    expect(state).toEqual(cartReducer(undefined, { type: "@@INIT" }));
  });

  it("should have the correct initial state for login slice", () => {
    const state = store.getState().login;

    expect(state).toEqual(loginReducer(undefined, { type: "@@INIT" }));
  });

  it("should handle setProducts dispatch actions correctly", () => {
    store.dispatch(setProducts([{ id: 1, category: "men's clothing" }]));

    const state = store.getState().products;

    expect(state.products).toEqual([{ id: 1, category: "men's clothing" }]);
  });

  it("should set fetchDone to true if products array is not empty after dispatching fetched", () => {
    store.dispatch(setProducts([{ id: 1, category: "men's clothing" }]));
    store.dispatch(fetched());

    const state = store.getState().products;

    expect(state.fetchDone).toBe(true);
  });

  it("should update searchQuery state after dispatching filterData", () => {
    const query = "electronics";

    store.dispatch(filterData(query));

    const state = store.getState().products;

    expect(state.searchQuery).toBe(query);
  });

  it("should update cart state correctly after adding an item", () => {
    const item = { id: 1, price: 100.0 };

    store.dispatch(addItems(item));

    const state = store.getState().cart;

    expect(state.numberOfItems).toBe(1);
    expect(state.totalAmount).toBe(100.0);
  });

  it("should update cart state correctly after removing an item", () => {
    const item = { id: 1, price: 100.0 };
    store.dispatch(addItems(item));
    store.dispatch(removeItem(item));

    const state = store.getState().cart;

    expect(state.cartItems.length).toBe(0);
  });

  it("should update login state correctly after authentication", () => {
    const user = { id: 1, name: "John Doe", email: "johndoe@example.com" };

    store.dispatch(authenticate(user));

    const state = store.getState().login;

    expect(state.isLoggedIn).toBe(true);
    expect(state.userInfo).toEqual(user);
  });

  it("should update login state correctly after authentication", () => {
    store.dispatch(authenticate(null));

    const state = store.getState().login;

    expect(state.isLoggedIn).toBe(false);
    expect(state.userInfo).toEqual(null);
  });
});
