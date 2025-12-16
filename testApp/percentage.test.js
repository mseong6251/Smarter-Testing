import { percentage } from "../src/percentage";

describe("Percentage Function Tests", () => {
  test("Percentage calculates correctly", () => {
    expect(percentage(25, 100)).toBe(25);
  });

  test("Percentage handles half", () => {
    expect(percentage(50, 100)).toBe(50);
  });

  test("Percentage handles decimal results", () => {
    expect(percentage(1, 3)).toBeCloseTo(33.33, 2);
  });

  test("Percentage handles zero numerator", () => {
    expect(percentage(0, 100)).toBe(0);
  });

  test("Percentage throws error for division by zero", () => {
    expect(() => percentage(25, 0)).toThrow("Cannot divide by zero");
  });

  test("Percentage throws error for invalid input", () => {
    expect(() => percentage("abc", 100)).toThrow("Please enter valid numbers");
  });

  test("Percentage handles values over 100%", () => {
    expect(percentage(150, 100)).toBe(150);
  });
});

