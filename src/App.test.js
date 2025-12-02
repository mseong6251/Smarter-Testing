import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Calculator App", () => {
  test("renders calculator title", () => {
    render(<App />);
    const titleElement = screen.getByText(/Simple React Calculator/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders input fields", () => {
    render(<App />);
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    expect(firstInput).toBeInTheDocument();
    expect(secondInput).toBeInTheDocument();
  });

  test("renders all operation buttons", () => {
    render(<App />);
    expect(screen.getByText(/Add \(\+\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Multiply \(×\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Divide \(÷\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Power \(\^\)/i)).toBeInTheDocument();
  });

  test("renders Clear All and Clear History buttons", () => {
    render(<App />);
    expect(screen.getByText(/Clear All/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear History/i)).toBeInTheDocument();
  });

  test("shows initial state with no calculation message", () => {
    render(<App />);
    expect(screen.getByText("No calculation yet")).toBeInTheDocument();
  });

  test("performs basic addition", () => {
    render(<App />);

    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);

    fireEvent.change(firstInput, { target: { value: "5" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(addButton);

    // Check for the result in the result section specifically
    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("8.00");
  });

  test("performs multiplication", () => {
    render(<App />);

    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const multiplyButton = screen.getByText(/Multiply \(×\)/i);

    fireEvent.change(firstInput, { target: { value: "4" } });
    fireEvent.change(secondInput, { target: { value: "6" } });
    fireEvent.click(multiplyButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("24.00");
  });

  test("performs power operation", () => {
    render(<App />);

    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const powerButton = screen.getByText(/Power \(\^\)/i);

    fireEvent.change(firstInput, { target: { value: "2" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(powerButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("8.00");
  });

  test("handles division by zero", () => {
    render(<App />);

    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const divideButton = screen.getByText(/Divide \(÷\)/i);

    fireEvent.change(firstInput, { target: { value: "10" } });
    fireEvent.change(secondInput, { target: { value: "0" } });
    fireEvent.click(divideButton);

    expect(
      screen.getByText("Error: Cannot divide by zero")
    ).toBeInTheDocument();
  });

  test("handles invalid number input - empty fields", () => {
    render(<App />);

    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);

    fireEvent.change(firstInput, { target: { value: "" } });
    fireEvent.change(secondInput, { target: { value: "5" } });
    fireEvent.click(addButton);

    expect(
      screen.getByText("Error: Please enter valid numbers")
    ).toBeInTheDocument();
  });

  test("handles invalid number input - non-numeric values", () => {
    render(<App />);

    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);

    fireEvent.change(firstInput, { target: { value: "abc" } });
    fireEvent.change(secondInput, { target: { value: "5" } });
    fireEvent.click(addButton);

    expect(
      screen.getByText("Error: Please enter valid numbers")
    ).toBeInTheDocument();
  });

  test("tracks calculation history", () => {
    render(<App />);

    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);

    fireEvent.change(firstInput, { target: { value: "2" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(addButton);

    expect(screen.getByText("2 + 3 = 5.00")).toBeInTheDocument();
  });

  test("shows last result after calculation", () => {
    render(<App />);

    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const multiplyButton = screen.getByText(/Multiply \(×\)/i);

    fireEvent.change(firstInput, { target: { value: "3" } });
    fireEvent.change(secondInput, { target: { value: "7" } });
    fireEvent.click(multiplyButton);

    // Check if last result is displayed (using DOM query for specificity)
    const lastResultElement = document.querySelector(".last-result");
    expect(lastResultElement).toBeInTheDocument();
    expect(lastResultElement).toHaveTextContent("Last Result: 21.00");
  });

  test("tracks multiple calculations in history", () => {
    render(<App />);

    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);
    const multiplyButton = screen.getByText(/Multiply \(×\)/i);

    // First calculation
    fireEvent.change(firstInput, { target: { value: "2" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(addButton);

    // Second calculation
    fireEvent.change(firstInput, { target: { value: "4" } });
    fireEvent.change(secondInput, { target: { value: "5" } });
    fireEvent.click(multiplyButton);

    // Check both entries in history
    expect(screen.getByText("2 + 3 = 5.00")).toBeInTheDocument();
    expect(screen.getByText("4 * 5 = 20.00")).toBeInTheDocument();
  });

  test("clears all data when Clear All is clicked", () => {
    render(<App />);

    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);
    const clearAllButton = screen.getByText(/Clear All/i);

    // Do a calculation first
    fireEvent.change(firstInput, { target: { value: "5" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(addButton);

    // Verify calculation was done
    expect(screen.getByText("5 + 3 = 8.00")).toBeInTheDocument();

    // Clear all
    fireEvent.click(clearAllButton);

    // Check inputs are cleared
    expect(firstInput.value).toBe("");
    expect(secondInput.value).toBe("");

    // Check result is cleared
    expect(screen.getByText("No calculation yet")).toBeInTheDocument();

    // Check history is cleared
    expect(screen.getByText("No calculations yet")).toBeInTheDocument();

    // Check last result is cleared
    expect(screen.queryByText(/Last Result:/)).not.toBeInTheDocument();
  });

  test("clears only history when Clear History is clicked", () => {
    render(<App />);

    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);
    const clearHistoryButton = screen.getByText(/Clear History/i);

    // Do a calculation first
    fireEvent.change(firstInput, { target: { value: "7" } });
    fireEvent.change(secondInput, { target: { value: "2" } });
    fireEvent.click(addButton);

    // Verify calculation was done
    expect(screen.getByText("7 + 2 = 9.00")).toBeInTheDocument();

    // Clear history only
    fireEvent.click(clearHistoryButton);

    // Check inputs are NOT cleared
    expect(firstInput.value).toBe("7");
    expect(secondInput.value).toBe("2");

    // Check result is NOT cleared
    expect(screen.getByText("9.00")).toBeInTheDocument();

    // Check history is cleared
    expect(screen.getByText("No calculations yet")).toBeInTheDocument();

    // Check last result is cleared
    expect(screen.queryByText(/Last Result:/)).not.toBeInTheDocument();
  });

  test("performs division correctly", () => {
    render(<App />);

    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const divideButton = screen.getByText(/Divide \(÷\)/i);

    fireEvent.change(firstInput, { target: { value: "15" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(divideButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("5.00");
  });
});
