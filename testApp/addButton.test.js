import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

describe("Add Button Tests", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Add button is rendered", () => {
    const addButton = screen.getByText(/Add \(\+\)/i);
    expect(addButton).toBeInTheDocument();
  });

  test("Add button performs addition correctly", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);

    fireEvent.change(firstInput, { target: { value: "5" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(addButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("8.00");
  });

  test("Add button handles negative numbers", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);

    fireEvent.change(firstInput, { target: { value: "-5" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(addButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("-2.00");
  });

  test("Add button handles decimal numbers", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);

    fireEvent.change(firstInput, { target: { value: "2.5" } });
    fireEvent.change(secondInput, { target: { value: "3.7" } });
    fireEvent.click(addButton);

    const resultElement = document.querySelector(".result .success");
    expect(resultElement).toHaveTextContent("6.20");
  });

  test("Add button shows error for invalid input", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);

    fireEvent.change(firstInput, { target: { value: "abc" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(addButton);

    const errorElement = document.querySelector(".result .error");
    expect(errorElement).toHaveTextContent("Error: Please enter valid numbers");
  });

  test("Add button adds entry to history", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);

    fireEvent.change(firstInput, { target: { value: "10" } });
    fireEvent.change(secondInput, { target: { value: "5" } });
    fireEvent.click(addButton);

    expect(screen.getByText("10 + 5 = 15.00")).toBeInTheDocument();
  });
});
