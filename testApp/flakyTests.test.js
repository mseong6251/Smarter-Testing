import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

describe("Flaky Tests", () => {
  beforeEach(() => {
    render(<App />);
  });

  // Flaky test 1: Random number comparison
  test("Flaky test 1: Random number comparison", () => {
    const randomNum = Math.random();
    // This will fail ~50% of the time when randomNum > 0.5
    expect(randomNum).toBeLessThan(0.5);
  });

  // Flaky test 2: Time-based condition
  test("Flaky test 2: Time-based condition", () => {
    const currentSecond = new Date().getSeconds();
    // This will fail when currentSecond is even
    expect(currentSecond % 2).toBe(1);
  });

  // Flaky test 3: Race condition with async operation
  test("Flaky test 3: Race condition with async operation", async () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);

    fireEvent.change(firstInput, { target: { value: "5" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    
    // Race condition: checking result before state updates
    fireEvent.click(addButton);
    
    // Sometimes the DOM hasn't updated yet
    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("8.00");
  });

  // Flaky test 4: Non-deterministic string matching
  test("Flaky test 4: Non-deterministic string matching", () => {
    const timestamp = Date.now();
    const randomString = `test-${timestamp}-${Math.floor(Math.random() * 1000)}`;
    
    // This will fail when the random part is divisible by 3
    expect(randomString.length % 3).not.toBe(0);
  });

  // Flaky test 5: Order-dependent state test
  test("Flaky test 5: Order-dependent state test", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);
    const multiplyButton = screen.getByText(/Multiply \(×\)/i);

    // Perform operations in quick succession
    fireEvent.change(firstInput, { target: { value: "2" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(addButton);
    
    // Immediately check and perform another operation
    // This may fail if state hasn't updated
    const currentValue = firstInput.value;
    fireEvent.change(firstInput, { target: { value: "4" } });
    fireEvent.click(multiplyButton);
    
    // This assertion depends on timing of state updates
    expect(secondInput.value).toBe("3");
  });
});

