import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

describe("Power Button Tests", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Power button is rendered", () => {
    const powerButton = screen.getByText(/Power \(\^\)/i);
    expect(powerButton).toBeInTheDocument();
  });

  test("Power button performs exponentiation correctly", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const powerButton = screen.getByText(/Power \(\^\)/i);

    fireEvent.change(firstInput, { target: { value: "2" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(powerButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("8.00");
  });

  test("Power button handles base to the power of zero", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const powerButton = screen.getByText(/Power \(\^\)/i);

    fireEvent.change(firstInput, { target: { value: "5" } });
    fireEvent.change(secondInput, { target: { value: "0" } });
    fireEvent.click(powerButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("1.00");
  });

  test("Power button handles negative exponent", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const powerButton = screen.getByText(/Power \(\^\)/i);

    fireEvent.change(firstInput, { target: { value: "2" } });
    fireEvent.change(secondInput, { target: { value: "-2" } });
    fireEvent.click(powerButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("0.25");
  });

  test("Power button handles decimal exponent", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const powerButton = screen.getByText(/Power \(\^\)/i);

    fireEvent.change(firstInput, { target: { value: "4" } });
    fireEvent.change(secondInput, { target: { value: "0.5" } });
    fireEvent.click(powerButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("2.00");
  });

  test("Power button handles large numbers", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const powerButton = screen.getByText(/Power \(\^\)/i);

    fireEvent.change(firstInput, { target: { value: "10" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(powerButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("1000.00");
  });

  test("Power button shows error for invalid input", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const powerButton = screen.getByText(/Power \(\^\)/i);

    fireEvent.change(firstInput, { target: { value: "test" } });
    fireEvent.change(secondInput, { target: { value: "2" } });
    fireEvent.click(powerButton);

    const errorElement = document.querySelector(".result .error");
    expect(errorElement).toHaveTextContent("Error: Please enter valid numbers");
  });

  test("Power button adds entry to history", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const powerButton = screen.getByText(/Power \(\^\)/i);

    fireEvent.change(firstInput, { target: { value: "3" } });
    fireEvent.change(secondInput, { target: { value: "2" } });
    fireEvent.click(powerButton);

    expect(screen.getByText("3 ^ 2 = 9.00")).toBeInTheDocument();
  });
});
