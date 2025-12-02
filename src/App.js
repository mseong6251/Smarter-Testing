import React, { useState } from "react";
import "./App.css";

///test

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [lastResult, setLastResult] = useState(null);

  const calculate = (operation) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setResult("Error: Please enter valid numbers");
      return;
    }

    let calcResult;
    let operationSymbol;

    switch (operation) {
      case "add":
        calcResult = n1 + n2;
        operationSymbol = "+";
        break;
      case "multiply":
        calcResult = n1 * n2;
        operationSymbol = "*";
        break;
      case "divide":
        if (n2 === 0) {
          setResult("Error: Cannot divide by zero");
          return;
        }
        calcResult = n1 / n2;
        operationSymbol = "/";
        break;
      case "power":
        calcResult = Math.pow(n1, n2);
        operationSymbol = "^";
        break;
      default:
        return;
    }

    const formattedResult = calcResult.toFixed(2);
    const historyEntry = `${n1} ${operationSymbol} ${n2} = ${formattedResult}`;

    setResult(formattedResult);
    setLastResult(calcResult);
    setHistory((prev) => [...prev, historyEntry]);
  };

  const clearAll = () => {
    setNum1("");
    setNum2("");
    setResult("");
    setHistory([]);
    setLastResult(null);
  };

  const clearHistory = () => {
    setHistory([]);
    setLastResult(null);
  };

  return (
    <div className="calculator">
      <h1>🧮 Simple React Calculator!</h1>

      <div className="input-section">
        <input
          type="number"
          placeholder="First number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="number-input"
        />
        <input
          type="number"
          placeholder="Second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className="number-input"
        />
      </div>

      <div className="button-section">
        <button onClick={() => calculate("add")} className="calc-btn add">
          Add (+)
        </button>
        <button
          onClick={() => calculate("multiply")}
          className="calc-btn multiply"
        >
          Multiply (×)
        </button>
        <button onClick={() => calculate("divide")} className="calc-btn divide">
          Divide (÷)
        </button>
        <button onClick={() => calculate("power")} className="calc-btn power">
          Power (^)
        </button>
      </div>

      <div className="result-section">
        <div className="result">
          <strong>Result: </strong>
          <span className={result.startsWith("Error") ? "error" : "success"}>
            {result || "No calculation yet"}
          </span>
        </div>

        {lastResult !== null && (
          <div className="last-result">
            <strong>Last Result: </strong>
            {lastResult.toFixed(2)}
          </div>
        )}
      </div>

      <div className="controls">
        <button onClick={clearAll} className="clear-btn">
          Clear All
        </button>
        <button onClick={clearHistory} className="clear-btn">
          Clear History
        </button>
      </div>

      <div className="history-section">
        <h3>📜 History</h3>
        {history.length === 0 ? (
          <p className="no-history">No calculations yet</p>
        ) : (
          <ul className="history-list">
            {history.map((entry, index) => (
              <li key={index} className="history-item">
                {entry}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
