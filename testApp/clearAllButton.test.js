import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

describe("Clear All Button Tests", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Clear All button is rendered", () => {
    const clearAllButton = screen.getByText(/Clear All/i);
    expect(clearAllButton).toBeInTheDocument();
  });

  test("Clear All button clears input fields", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const clearAllButton = screen.getByText(/Clear All/i);

    fireEvent.change(firstInput, { target: { value: "10" } });
    fireEvent.change(secondInput, { target: { value: "5" } });
    fireEvent.click(clearAllButton);

    expect(firstInput).toHaveValue("");
    expect(secondInput).toHaveValue("");
  });

  test("Clear All button clears result", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);
    const clearAllButton = screen.getByText(/Clear All/i);

    fireEvent.change(firstInput, { target: { value: "5" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(addButton);

    const resultBefore = document.querySelector(".result .success");
    expect(resultBefore).toHaveTextContent("8.00");

    fireEvent.click(clearAllButton);

    const resultAfter = document.querySelector(".result");
    expect(resultAfter).toHaveTextContent("No calculation yet");
  });

  test("Clear All button clears history", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);
    const clearAllButton = screen.getByText(/Clear All/i);

    fireEvent.change(firstInput, { target: { value: "2" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(addButton);

    expect(screen.getByText("2 + 3 = 5.00")).toBeInTheDocument();

    fireEvent.click(clearAllButton);

    expect(screen.getByText("No calculations yet")).toBeInTheDocument();
  });

  test("Clear All button clears last result", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);
    const clearAllButton = screen.getByText(/Clear All/i);

    fireEvent.change(firstInput, { target: { value: "10" } });
    fireEvent.change(secondInput, { target: { value: "5" } });
    fireEvent.click(addButton);

    expect(screen.getByText(/Last Result:/)).toBeInTheDocument();

    fireEvent.click(clearAllButton);

    expect(screen.queryByText(/Last Result:/)).not.toBeInTheDocument();
  });

  test("Clear All button works after multiple calculations", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);
    const multiplyButton = screen.getByText(/Multiply \(×\)/i);
    const clearAllButton = screen.getByText(/Clear All/i);

    fireEvent.change(firstInput, { target: { value: "2" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(addButton);

    fireEvent.change(firstInput, { target: { value: "4" } });
    fireEvent.change(secondInput, { target: { value: "5" } });
    fireEvent.click(multiplyButton);

    expect(screen.getByText("2 + 3 = 5.00")).toBeInTheDocument();
    expect(screen.getByText("4 * 5 = 20.00")).toBeInTheDocument();

    fireEvent.click(clearAllButton);

    expect(firstInput).toHaveValue("");
    expect(secondInput).toHaveValue("");
    expect(screen.getByText("No calculations yet")).toBeInTheDocument();
  });
});
