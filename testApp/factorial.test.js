import { factorial } from "../src/factorial";

describe("Factorial Function Tests", () => {
  test("Factorial calculates correctly for small numbers", () => {
    expect(factorial(5)).toBe(120);
  });

  test("Factorial handles zero", () => {
    expect(factorial(0)).toBe(1);
  });

  test("Factorial handles one", () => {
    expect(factorial(1)).toBe(1);
  });

  test("Factorial calculates correctly for larger numbers", () => {
    expect(factorial(7)).toBe(5040);
  });

  test("Factorial throws error for negative numbers", () => {
    expect(() => factorial(-5)).toThrow("Cannot calculate factorial of negative number");
  });

  test("Factorial throws error for decimal numbers", () => {
    expect(() => factorial(5.5)).toThrow("Factorial can only be calculated for integers");
  });

  test("Factorial throws error for invalid input", () => {
    expect(() => factorial("abc")).toThrow("Please enter a valid number");
  });
});

