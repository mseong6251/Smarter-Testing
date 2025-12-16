/**
 * Percentage utility function
 * Calculates what percentage the first number is of the second number
 */
export const percentage = (num1, num2) => {
  if (isNaN(num1) || isNaN(num2)) {
    throw new Error("Please enter valid numbers");
  }
  if (num2 === 0) {
    throw new Error("Cannot divide by zero");
  }
  return (num1 / num2) * 100;
};

export default percentage;

