import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const App = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("XAF");
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setExchangeRates(data.rates))
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, []);

  useEffect(() => {
    if (
      fromCurrency !== toCurrency &&
      exchangeRates[fromCurrency] &&
      exchangeRates[toCurrency]
    ) {
      const result =
        (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
      setConvertedAmount(result.toFixed(2));
    } else {
      setConvertedAmount(amount.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handleFromCurrencyChange = (e) => {
    const value = e.target.value;
    setFromCurrency(value);
  };

  const handleToCurrencyChange = (e) => {
    const value = e.target.value;
    setToCurrency(value);
  };

  return (
    <div className="app-container">
      <h1>Currency Exchange App</h1>
      <div className="input-container">
        <label>Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div className="input-container">
        <label>From Currency:</label>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="input-container">
        <label>To Currency:</label>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="result-container">
        <p>Converted Amount: {convertedAmount}</p>
      </div>
    </div>
  );
};

export default App;
