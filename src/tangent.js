/**
 * Tangent utility function
 * Returns the tangent of an angle in radians
 */

export const tangent = (angle) => {
  if (isNaN(angle)) {
    throw new Error("Please enter a valid number");
  }
  return Math.tan(angle);
};

export default tangent;
