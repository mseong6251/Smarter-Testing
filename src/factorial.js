/**
 * Factorial utility function
 * Returns the factorial of a number (n!)
 */
export const factorial = (num) => {
  if (isNaN(num)) {
    throw new Error("Please enter a valid number");
  }
  if (num < 0) {
    throw new Error("Cannot calculate factorial of negative number");
  }
  if (!Number.isInteger(num)) {
    throw new Error("Factorial can only be calculated for integers");
  }
  if (num === 0 || num === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
};

export default factorial;

