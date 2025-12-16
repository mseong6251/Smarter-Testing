import { modulo } from "../src/modulo";

describe("Modulo Function Tests", () => {
  test("Modulo performs modulo operation correctly", () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test("Modulo handles zero remainder", () => {
    expect(modulo(10, 5)).toBe(0);
  });

  test("Modulo handles negative numbers", () => {
    expect(modulo(-10, 3)).toBe(-1);
  });

  test("Modulo handles decimal numbers", () => {
    expect(modulo(10.5, 3)).toBeCloseTo(1.5, 2);
  });

  test("Modulo throws error for division by zero", () => {
    expect(() => modulo(10, 0)).toThrow("Cannot divide by zero");
  });

  test("Modulo throws error for invalid input", () => {
    expect(() => modulo("abc", 3)).toThrow("Please enter valid numbers");
  });

  test("Modulo handles large numbers", () => {
    expect(modulo(1000, 7)).toBe(6);
  });
});

