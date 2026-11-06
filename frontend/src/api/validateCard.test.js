import { describe, it, expect, vi, afterEach } from "vitest";
import { validateCard } from "./validateCard";

afterEach(() => vi.unstubAllGlobals());

describe("validateCard", () => {
  it("returns the backend answer when the request works", async () => {
    const answer = { valid: true, card_type: "Visa", masked: "************1111", message: "Valid card number." };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => answer }));
    expect(await validateCard("4111 1111 1111 1111")).toEqual(answer);
  });

  it("throws the backend error message on a 400", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: "card_number (text) is required." }) }));
    await expect(validateCard("")).rejects.toThrow("card_number (text) is required.");
  });

  it("throws a friendly message when the server is down", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    await expect(validateCard("4111")).rejects.toThrow("Cannot reach the server");
  });
});
