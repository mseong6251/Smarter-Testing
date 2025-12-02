import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

describe("Clear History Button Tests", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("Clear History button is rendered", () => {
    const clearHistoryButton = screen.getByText(/Clear History/i);
    expect(clearHistoryButton).toBeInTheDocument();
  });

  test("Clear History button clears history but keeps inputs", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);
    const clearHistoryButton = screen.getByText(/Clear History/i);

    fireEvent.change(firstInput, { target: { value: "10" } });
    fireEvent.change(secondInput, { target: { value: "5" } });
    fireEvent.click(addButton);

    expect(screen.getByText("10 + 5 = 15.00")).toBeInTheDocument();

    fireEvent.click(clearHistoryButton);

    expect(screen.getByText("No calculations yet")).toBeInTheDocument();
    expect(firstInput).toHaveValue("10");
    expect(secondInput).toHaveValue("5");
  });

  test("Clear History button clears last result", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);
    const clearHistoryButton = screen.getByText(/Clear History/i);

    fireEvent.change(firstInput, { target: { value: "7" } });
    fireEvent.change(secondInput, { target: { value: "2" } });
    fireEvent.click(addButton);

    expect(screen.getByText(/Last Result:/)).toBeInTheDocument();

    fireEvent.click(clearHistoryButton);

    expect(screen.queryByText(/Last Result:/)).not.toBeInTheDocument();
  });

  test("Clear History button does not clear current result", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);
    const clearHistoryButton = screen.getByText(/Clear History/i);

    fireEvent.change(firstInput, { target: { value: "8" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(addButton);

    const resultBefore = document.querySelector(".result .success");
    expect(resultBefore).toHaveTextContent("11.00");

    fireEvent.click(clearHistoryButton);

    const resultAfter = document.querySelector(".result .success");
    expect(resultAfter).toHaveTextContent("11.00");
  });

  test("Clear History button works with multiple history entries", () => {
    const firstInput = screen.getByPlaceholderText(/first number/i);
    const secondInput = screen.getByPlaceholderText(/second number/i);
    const addButton = screen.getByText(/Add \(\+\)/i);
    const multiplyButton = screen.getByText(/Multiply \(×\)/i);
    const clearHistoryButton = screen.getByText(/Clear History/i);

    fireEvent.change(firstInput, { target: { value: "2" } });
    fireEvent.change(secondInput, { target: { value: "3" } });
    fireEvent.click(addButton);

    fireEvent.change(firstInput, { target: { value: "4" } });
    fireEvent.change(secondInput, { target: { value: "5" } });
    fireEvent.click(multiplyButton);

    expect(screen.getByText("2 + 3 = 5.00")).toBeInTheDocument();
    expect(screen.getByText("4 * 5 = 20.00")).toBeInTheDocument();

    fireEvent.click(clearHistoryButton);

    expect(screen.getByText("No calculations yet")).toBeInTheDocument();
  });

  test("Clear History button does nothing when history is empty", () => {
    const clearHistoryButton = screen.getByText(/Clear History/i);

    expect(screen.getByText("No calculations yet")).toBeInTheDocument();

    fireEvent.click(clearHistoryButton);

    expect(screen.getByText("No calculations yet")).toBeInTheDocument();
  });
});
