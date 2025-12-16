/**
 * Absolute Value utility function
 * Returns the absolute value of a number
 */
export const absoluteValue = (num) => {
  if (isNaN(num)) {
    throw new Error("Please enter a valid number");
  }
  return Math.abs(num);
};

export default absoluteValue;

