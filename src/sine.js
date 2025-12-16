/**
 * Sine utility function
 * Returns the sine of an angle in radians
 */
export const sine = (angle) => {
  if (isNaN(angle)) {
    throw new Error("Please enter a valid number");
  }
  return Math.sin(angle);
};

export default sine;

