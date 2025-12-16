import { sine } from "../src/sine";

describe("Sine Function Tests", () => {
  test("Sine calculates correctly for 0 radians", () => {
    expect(sine(0)).toBe(0);
  });

  test("Sine calculates correctly for π/2 radians", () => {
    expect(sine(Math.PI / 2)).toBeCloseTo(1, 2);
  });

  test("Sine calculates correctly for π radians", () => {
    expect(sine(Math.PI)).toBeCloseTo(0, 2);
  });

  test("Sine handles negative angles", () => {
    expect(sine(-Math.PI / 2)).toBeCloseTo(-1, 2);
  });

  test("Sine handles decimal angles", () => {
    expect(sine(0.5)).toBeCloseTo(0.479, 2);
  });

  test("Sine throws error for invalid input", () => {
    expect(() => sine("abc")).toThrow("Please enter a valid number");
  });

  test("Sine handles large angles", () => {
    expect(sine(2 * Math.PI)).toBeCloseTo(0, 2);
  });
});

