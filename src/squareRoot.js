/**
 * Square Root utility function
 * Returns the square root of a number
 */
export const squareRoot = (num) => {
  if (isNaN(num)) {
    throw new Error("Please enter a valid number");
  }
  if (num < 0) {
    throw new Error("Cannot calculate square root of negative number");
  }
  return Math.sqrt(num);
};

export default squareRoot;

