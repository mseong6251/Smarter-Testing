import { absoluteValue } from "../src/absoluteValue";

describe("Absolute Value Function Tests", () => {
  test("Absolute value returns positive for negative numbers", () => {
    expect(absoluteValue(-5)).toBe(5);
  });

  test("Absolute value returns same for positive numbers", () => {
    expect(absoluteValue(5)).toBe(5);
  });

  test("Absolute value handles zero", () => {
    expect(absoluteValue(0)).toBe(0);
  });

  test("Absolute value handles decimal numbers", () => {
    expect(absoluteValue(-3.14)).toBe(3.14);
  });

  test("Absolute value handles large negative numbers", () => {
    expect(absoluteValue(-1000)).toBe(1000);
  });

  test("Absolute value throws error for invalid input", () => {
    expect(() => absoluteValue("abc")).toThrow("Please enter a valid number");
  });

  test("Absolute value handles very small numbers", () => {
    expect(absoluteValue(-0.001)).toBe(0.001);
  });
});

