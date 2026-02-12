import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

// Counters to track retry attempts for deterministic flaky tests
// All tests will succeed after 1 rerun
let retryCounter1 = 0;
let retryCounter2 = 0;
let retryCounter3 = 0;
let retryCounter4 = 0;
let retryCounter5 = 0;
let retryCounter6 = 0;
let retryCounter7 = 0;
let retryCounter8 = 0;

describe("Flaky Tests", () => {
  beforeEach(() => {
    render(<App />);
  });

  // Flaky test 1: Random number comparison
  test("Flaky test 1: Random number comparison", () => {
    retryCounter1++;
    // This test will fail on the first attempt and pass on the second attempt
    expect(retryCounter1).toBeGreaterThan(1);
  });

  // Flaky test 2: Time-based condition
  test("Flaky test 2: Time-based condition", () => {
    retryCounter2++;
    // This test will fail on the first attempt and pass on the second attempt
    expect(retryCounter2).toBeGreaterThan(1);
  });

  // Flaky test 3: Race condition with async operation
  test("Flaky test 3: Race condition with async operation", async () => {
    retryCounter3++;
    // This test will fail on the first attempt and pass on the second attempt
    expect(retryCounter3).toBeGreaterThan(1);
  });

  // Flaky test 4: Non-deterministic string matching
  test("Flaky test 4: Non-deterministic string matching", () => {
    retryCounter4++;
    // This test will fail on the first attempt and pass on the second attempt
    expect(retryCounter4).toBeGreaterThan(1);
  });

  // Flaky test 5: Order-dependent state test
  test("Flaky test 5: Order-dependent state test", () => {
    retryCounter5++;
    // This test will fail on the first attempt and pass on the second attempt
    expect(retryCounter5).toBeGreaterThan(1);
  });

  // Test that succeeds after 1 rerun (fails first time, passes second time)
  test("Test that succeeds after 1 rerun", () => {
    retryCounter6++;
    // This test will fail on the first attempt and pass on the second attempt
    expect(retryCounter6).toBeGreaterThan(1);
  });

  // Test that succeeds after 1 rerun (fails first time, passes second time)
  test("Test that succeeds after 1 rerun (second)", () => {
    retryCounter7++;
    // This test will fail on the first attempt and pass on the second attempt
    expect(retryCounter7).toBeGreaterThan(1);
  });

  // Test that succeeds after 1 rerun (fails first time, passes second time)
  test("Test that succeeds after 1 rerun (third)", () => {
    retryCounter8++;
    // This test will fail on the first attempt and pass on the second attempt
    expect(retryCounter8).toBeGreaterThan(1);
  });
});

