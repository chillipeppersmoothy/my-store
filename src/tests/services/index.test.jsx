/* eslint-disable no-undef */
import { describe, expect, it, vi } from "vitest";
import { authenticateUser, getProducts } from "../../services";

describe("services", () => {
  global.fetch = vi.fn();

  describe("getProducts", () => {
    it("should fetch the products from API", async () => {
      fetch.mockResolvedValue({
        json: vi.fn().mockResolvedValue([
          { id: "1", name: "test1" },
          { id: "2", name: "test2" },
        ]),
      });

      const products = await getProducts({});
      expect(products).toHaveLength(2);
    });

    it("should throw error API fails", async () => {
      const error = new Error("fetch failed");

      fetch.mockRejectedValue(error);

      await expect(getProducts({})).rejects.toThrow(error);
    });
  });

  describe("authenticateUser", () => {
    it("should fetch the users from API", async () => {
      fetch.mockResolvedValue({
        json: vi.fn().mockResolvedValue([
          { id: 1, user: "test" },
          { id: 2, user: "test2" },
        ]),
      });

      const users = await authenticateUser();
      expect(users).toHaveLength(2);
    });

    it("should throw error API fails", async () => {
      const error = new Error("fetch failed");

      fetch.mockRejectedValue(error);

      await expect(authenticateUser()).rejects.toThrow(error);
    });
  });
});
