/**
 * Logarithm utility function
 * Returns the natural logarithm (base e) of a number
 */
export const logarithm = (num) => {
  if (isNaN(num)) {
    throw new Error("Please enter a valid number");
  }
  if (num <= 0) {
    throw new Error("Cannot calculate logarithm of zero or negative number");
  }
  return Math.log(num);
};

export default logarithm;

