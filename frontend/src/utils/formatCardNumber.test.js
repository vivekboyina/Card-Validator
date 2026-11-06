import { describe, it, expect } from "vitest";
import { formatCardNumber } from "./formatCardNumber";

describe("formatCardNumber", () => {
  it("adds a space after every 4 digits", () => {
    expect(formatCardNumber("4111111111111111")).toBe("4111 1111 1111 1111");
  });
  it("removes letters and symbols", () => {
    expect(formatCardNumber("41ab11-11")).toBe("4111 11");
  });
  it("stops at 19 digits", () => {
    expect(formatCardNumber("1".repeat(25)).replace(/ /g, "")).toHaveLength(19);
  });
  it("returns empty text for empty input", () => {
    expect(formatCardNumber("")).toBe("");
  });
});
