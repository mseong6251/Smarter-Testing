import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

describe("Multiply Button Tests", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Multiply button is rendered", () => {
    const multiplyButton = screen.getByText(/Multiply \(×\)/i);
    expect(multiplyButton).toBeInTheDocument();
  });

  test("Multiply button performs multiplication correctly", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const multiplyButton = screen.getByText(/Multiply \(×\)/i);

    fireEvent.change(firstInput, { target: { value: "4" } });
    fireEvent.change(secondInput, { target: { value: "6" } });
    fireEvent.click(multiplyButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("24.00");
  });

  test("Multiply button handles zero", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const multiplyButton = screen.getByText(/Multiply \(×\)/i);

    fireEvent.change(firstInput, { target: { value: "5" } });
    fireEvent.change(secondInput, { target: { value: "0" } });
    fireEvent.click(multiplyButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("0.00");
  });

  test("Multiply button handles negative numbers", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const multiplyButton = screen.getByText(/Multiply \(×\)/i);

    fireEvent.change(firstInput, { target: { value: "-3" } });
    fireEvent.change(secondInput, { target: { value: "4" } });
    fireEvent.click(multiplyButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("-12.00");
  });

  test("Multiply button handles decimal numbers", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const multiplyButton = screen.getByText(/Multiply \(×\)/i);

    fireEvent.change(firstInput, { target: { value: "2.5" } });
    fireEvent.change(secondInput, { target: { value: "4" } });
    fireEvent.click(multiplyButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("10.00");
  });

  test("Multiply button shows error for invalid input", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const multiplyButton = screen.getByText(/Multiply \(×\)/i);

    fireEvent.change(firstInput, { target: { value: "xyz" } });
    fireEvent.change(secondInput, { target: { value: "2" } });
    fireEvent.click(multiplyButton);

    const errorElement = document.querySelector(".result .error");
    expect(errorElement).toHaveTextContent("Error: Please enter valid numbers");
  });

  test("Multiply button adds entry to history", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const multiplyButton = screen.getByText(/Multiply \(×\)/i);

    fireEvent.change(firstInput, { target: { value: "7" } });
    fireEvent.change(secondInput, { target: { value: "8" } });
    fireEvent.click(multiplyButton);

    expect(screen.getByText("7 * 8 = 56.00")).toBeInTheDocument();
  });
});
