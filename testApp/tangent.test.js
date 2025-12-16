import { tangent } from "../src/tangent";

describe("Tangent Function Tests", () => {
  test("Tangent calculates correctly for 0 radians", () => {
    expect(tangent(0)).toBe(0);
  });

  test("Tangent calculates correctly for π/4 radians", () => {
    expect(tangent(Math.PI / 4)).toBeCloseTo(1, 2);
  });

  test("Tangent handles negative angles", () => {
    expect(tangent(-Math.PI / 4)).toBeCloseTo(-1, 2);
  });

  test("Tangent handles decimal angles", () => {
    expect(tangent(0.5)).toBeCloseTo(0.546, 2);
  });

  test("Tangent throws error for invalid input", () => {
    expect(() => tangent("abc")).toThrow("Please enter a valid number");
  });

  test("Tangent handles π radians", () => {
    expect(tangent(Math.PI)).toBeCloseTo(0, 2);
  });

  test("Tangent handles small angles", () => {
    expect(tangent(0.1)).toBeCloseTo(0.100, 2);
  });
});

