import { squareRoot } from "../src/squareRoot";

describe("Square Root Function Tests", () => {
  test("Square root calculates correctly for perfect squares", () => {
    expect(squareRoot(16)).toBe(4);
  });

  test("Square root calculates correctly for non-perfect squares", () => {
    expect(squareRoot(2)).toBeCloseTo(1.414, 2);
  });

  test("Square root handles zero", () => {
    expect(squareRoot(0)).toBe(0);
  });

  test("Square root handles decimal numbers", () => {
    expect(squareRoot(2.25)).toBe(1.5);
  });

  test("Square root throws error for negative numbers", () => {
    expect(() => squareRoot(-4)).toThrow("Cannot calculate square root of negative number");
  });

  test("Square root throws error for invalid input", () => {
    expect(() => squareRoot("abc")).toThrow("Please enter a valid number");
  });

  test("Square root handles large numbers", () => {
    expect(squareRoot(10000)).toBe(100);
  });
});

