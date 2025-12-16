import { cosine } from "../src/cosine";

describe("Cosine Function Tests", () => {
  test("Cosine calculates correctly for 0 radians", () => {
    expect(cosine(0)).toBe(1);
  });

  test("Cosine calculates correctly for π/2 radians", () => {
    expect(cosine(Math.PI / 2)).toBeCloseTo(0, 2);
  });

  test("Cosine calculates correctly for π radians", () => {
    expect(cosine(Math.PI)).toBeCloseTo(-1, 2);
  });

  test("Cosine handles negative angles", () => {
    expect(cosine(-Math.PI / 2)).toBeCloseTo(0, 2);
  });

  test("Cosine handles decimal angles", () => {
    expect(cosine(0.5)).toBeCloseTo(0.878, 2);
  });

  test("Cosine throws error for invalid input", () => {
    expect(() => cosine("abc")).toThrow("Please enter a valid number");
  });

  test("Cosine handles large angles", () => {
    expect(cosine(2 * Math.PI)).toBeCloseTo(1, 2);
  });
});

