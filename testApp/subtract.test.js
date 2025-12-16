import { subtract } from "../src/subtract";

describe("Subtract Function Tests", () => {
  test("Subtract performs subtraction correctly", () => {
    expect(subtract(10, 3)).toBe(7);
  });

  test("Subtract handles negative numbers", () => {
    expect(subtract(-5, 3)).toBe(-8);
  });

  test("Subtract handles decimal numbers", () => {
    expect(subtract(10.5, 3.2)).toBeCloseTo(7.3, 2);
  });

  test("Subtract handles zero", () => {
    expect(subtract(5, 0)).toBe(5);
  });

  test("Subtract throws error for invalid input", () => {
    expect(() => subtract("abc", 3)).toThrow("Please enter valid numbers");
  });

  test("Subtract handles large numbers", () => {
    expect(subtract(1000, 500)).toBe(500);
  });

  test("Subtract handles negative result", () => {
    expect(subtract(3, 10)).toBe(-7);
  });
});

