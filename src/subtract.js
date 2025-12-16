/**
 * Subtract utility function
 * Subtracts the second number from the first number
 */
export const subtract = (num1, num2) => {
  if (isNaN(num1) || isNaN(num2)) {
    throw new Error("Please enter valid numbers");
  }
  return num1 - num2;
};

export default subtract;
