/**
 * Cosine utility function!
 * Returns the cosine of an angle in radians
 */
export const cosine = (angle) => {
  if (isNaN(angle)) {
    throw new Error("Please enter a valid number");
  }
  return Math.cos(angle);
};

export default cosine;
