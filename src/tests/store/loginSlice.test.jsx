import { describe, it, expect } from "vitest";
import loginReducer, { authenticate } from "../../store/loginSlice";

describe("loginSlice reducers", () => {
  it("should set isLoggedIn to true and update userInfo when action payload is present", () => {
    const initialState = { isLoggedIn: false, userInfo: {} };
    const user = {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
    };
    const newState = loginReducer(initialState, authenticate(user));

    expect(newState.isLoggedIn).toBe(true);
    expect(newState.userInfo).toStrictEqual(user);
  });

  it("should set isLoggedIn to false and clear userInfo when action payload is falsy", () => {
    const initialState = {
      isLoggedIn: false,
      userInfo: {},
    };

    const newState = loginReducer(initialState, authenticate(null));

    expect(newState.isLoggedIn).toBe(false);
    expect(newState.userInfo).toStrictEqual(null);
  });
});
