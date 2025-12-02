import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

describe("Divide Button Tests", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Divide button is rendered", () => {
    const divideButton = screen.getByText(/Divide \(÷\)/i);
    expect(divideButton).toBeInTheDocument();
  });

  test("Divide button performs division correctly", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const divideButton = screen.getByText(/Divide \(÷\)/i);

    fireEvent.change(firstInput, { target: { value: "10" } });
    fireEvent.change(secondInput, { target: { value: "2" } });
    fireEvent.click(divideButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("5.00");
  });

  test("Divide button shows error when dividing by zero", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const divideButton = screen.getByText(/Divide \(÷\)/i);

    fireEvent.change(firstInput, { target: { value: "10" } });
    fireEvent.change(secondInput, { target: { value: "0" } });
    fireEvent.click(divideButton);

    const errorElement = document.querySelector(".result .error");
    expect(errorElement).toHaveTextContent("Error: Cannot divide by zero");
  });

  test("Divide button handles decimal results", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const divideButton = screen.getByText(/Divide \(÷\)/i);

    fireEvent.change(firstInput, { target: { value: "7" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(divideButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("2.33");
  });

  test("Divide button handles negative numbers", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const divideButton = screen.getByText(/Divide \(÷\)/i);

    fireEvent.change(firstInput, { target: { value: "-12" } });
    fireEvent.change(secondInput, { target: { value: "4" } });
    fireEvent.click(divideButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("-3.00");
  });

  test("Divide button handles decimal inputs", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const divideButton = screen.getByText(/Divide \(÷\)/i);

    fireEvent.change(firstInput, { target: { value: "5.5" } });
    fireEvent.change(secondInput, { target: { value: "2.5" } });
    fireEvent.click(divideButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("2.20");
  });

  test("Divide button shows error for invalid input", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const divideButton = screen.getByText(/Divide \(÷\)/i);

    fireEvent.change(firstInput, { target: { value: "abc" } });
    fireEvent.change(secondInput, { target: { value: "2" } });
    fireEvent.click(divideButton);

    const errorElement = document.querySelector(".result .error");
    expect(errorElement).toHaveTextContent("Error: Please enter valid numbers");
  });

  test("Divide button adds entry to history", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const divideButton = screen.getByText(/Divide \(÷\)/i);

    fireEvent.change(firstInput, { target: { value: "20" } });
    fireEvent.change(secondInput, { target: { value: "4" } });
    fireEvent.click(divideButton);

    expect(screen.getByText("20 / 4 = 5.00")).toBeInTheDocument();
  });
});
