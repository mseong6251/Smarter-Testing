import { logarithm } from "../src/logarithm";

describe("Logarithm Function Tests", () => {
  test("Logarithm calculates correctly for e", () => {
    expect(logarithm(Math.E)).toBeCloseTo(1, 2);
  });

  test("Logarithm calculates correctly for 1", () => {
    expect(logarithm(1)).toBe(0);
  });

  test("Logarithm calculates correctly for 10", () => {
    expect(logarithm(10)).toBeCloseTo(2.303, 2);
  });

  test("Logarithm handles decimal numbers", () => {
    expect(logarithm(2.718)).toBeCloseTo(1, 1);
  });

  test("Logarithm throws error for zero", () => {
    expect(() => logarithm(0)).toThrow("Cannot calculate logarithm of zero or negative number");
  });

  test("Logarithm throws error for negative numbers", () => {
    expect(() => logarithm(-5)).toThrow("Cannot calculate logarithm of zero or negative number");
  });

  test("Logarithm throws error for invalid input", () => {
    expect(() => logarithm("abc")).toThrow("Please enter a valid number");
  });
});

