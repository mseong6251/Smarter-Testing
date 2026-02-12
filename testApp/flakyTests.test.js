import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";
import fs from "fs";
import path from "path";

// Helper function to get and increment retry count from file
// This persists across separate test runs in CI
function getRetryCount(testName) {
  // Use project root to ensure files persist across CI reruns
  const projectRoot = process.cwd();
  const retryDir = path.join(projectRoot, '.test-retries');
  const sanitizedName = testName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  const retryFile = path.join(retryDir, `${sanitizedName}.txt`);
  
  let count = 0;
  
  try {
    // Ensure directory exists
    if (!fs.existsSync(retryDir)) {
      fs.mkdirSync(retryDir, { recursive: true });
    }
    
    if (fs.existsSync(retryFile)) {
      const content = fs.readFileSync(retryFile, 'utf8');
      count = parseInt(content.trim(), 10) || 0;
    }
  } catch (error) {
    // If file doesn't exist or can't be read, start at 0
    count = 0;
  }
  
  count++;
  
  try {
    fs.writeFileSync(retryFile, count.toString(), 'utf8');
  } catch (error) {
    // If we can't write, continue with in-memory count
  }
  
  return count;
}

describe("Flaky Tests", () => {
  beforeEach(() => {
    render(<App />);
  });

  // Flaky test 1: Random number comparison
  test("Flaky test 1: Random number comparison", () => {
    const count = getRetryCount("Flaky test 1: Random number comparison");
    // This test will fail on the first attempt and pass on the second attempt
    expect(count).toBeGreaterThan(1);
  });

  // Flaky test 2: Time-based condition
  test("Flaky test 2: Time-based condition", () => {
    const count = getRetryCount("Flaky test 2: Time-based condition");
    // This test will fail on the first attempt and pass on the second attempt
    expect(count).toBeGreaterThan(1);
  });

  // Flaky test 3: Race condition with async operation
  test("Flaky test 3: Race condition with async operation", async () => {
    const count = getRetryCount("Flaky test 3: Race condition with async operation");
    // This test will fail on the first attempt and pass on the second attempt
    expect(count).toBeGreaterThan(1);
  });

  // Flaky test 4: Non-deterministic string matching
  test("Flaky test 4: Non-deterministic string matching", () => {
    const count = getRetryCount("Flaky test 4: Non-deterministic string matching");
    // This test will fail on the first attempt and pass on the second attempt
    expect(count).toBeGreaterThan(1);
  });

  // Flaky test 5: Order-dependent state test
  test("Flaky test 5: Order-dependent state test", () => {
    const count = getRetryCount("Flaky test 5: Order-dependent state test");
    // This test will fail on the first attempt and pass on the second attempt
    expect(count).toBeGreaterThan(1);
  });

  // Test that succeeds after 1 rerun (fails first time, passes second time)
  test("Test that succeeds after 1 rerun", () => {
    const count = getRetryCount("Test that succeeds after 1 rerun");
    // This test will fail on the first attempt and pass on the second attempt
    expect(count).toBeGreaterThan(1);
  });

  // Test that succeeds after 1 rerun (fails first time, passes second time)
  test("Test that succeeds after 1 rerun (second)", () => {
    const count = getRetryCount("Test that succeeds after 1 rerun (second)");
    // This test will fail on the first attempt and pass on the second attempt
    expect(count).toBeGreaterThan(1);
  });

  // Test that succeeds after 1 rerun (fails first time, passes second time)
  test("Test that succeeds after 1 rerun (third)", () => {
    const count = getRetryCount("Test that succeeds after 1 rerun (third)");
    // This test will fail on the first attempt and pass on the second attempt
    expect(count).toBeGreaterThan(1);
  });
});

