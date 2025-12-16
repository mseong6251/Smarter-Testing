/**
 * Modulo utility function
 * Returns the remainder after division
 */
export const modulo = (num1, num2) => {
  if (isNaN(num1) || isNaN(num2)) {
    throw new Error("Please enter valid numbers");
  }
  if (num2 === 0) {
    throw new Error("Cannot divide by zero");
  }
  return num1 % num2;
};

export default modulo;

