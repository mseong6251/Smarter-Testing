import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

// Counters to track retry attempts for deterministic flaky tests
let retryCounter1 = 0; // For test that passes after 1 rerun
let retryCounter2 = 0; // For test that passes after 2 reruns
let retryCounter3 = 0; // For test that passes after 3 reruns

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

  // Test that succeeds after 1 rerun (fails first time, passes second time)
  test("Test that succeeds after 1 rerun", () => {
    retryCounter1++;
    // This test will fail on the first attempt (retryCounter1 = 1)
    // and pass on the second attempt (retryCounter1 = 2)
    expect(retryCounter1).toBeGreaterThan(1);
  });

  // Test that succeeds after 2 reruns (fails first two times, passes third time)
  test("Test that succeeds after 2 reruns", () => {
    retryCounter2++;
    // This test will fail on the first two attempts (retryCounter2 = 1, 2)
    // and pass on the third attempt (retryCounter2 = 3)
    expect(retryCounter2).toBeGreaterThan(2);
  });

  // Test that succeeds after 3 reruns (fails first three times, passes fourth time)
  test("Test that succeeds after 3 reruns", () => {
    retryCounter3++;
    // This test will fail on the first three attempts (retryCounter3 = 1, 2, 3)
    // and pass on the fourth attempt (retryCounter3 = 4)
    expect(retryCounter3).toBeGreaterThan(3);
  });
});

