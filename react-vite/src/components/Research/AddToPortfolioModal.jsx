import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPortfolioStockThunk, getPortfolioStocksThunk } from '../../redux/portfolio';
import { useModal } from '../../context/Modal';
import "../LoginFormModal/LoginForm.css";

function AddToPortfolioModal({ symbol, portfolios, stocksByPortfolioId, addedStocksPort }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [portfolioId, setPortfolioId] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!quantity || isNaN(quantity) || parseFloat(quantity) <= 0) {
      newErrors.quantity = "Quantity must be a positive number.";
    }

    if (!purchasePrice || isNaN(purchasePrice) || parseFloat(purchasePrice) <= 0) {
      newErrors.purchasePrice = "Purchase price must be a positive number.";
    }

    if (!portfolioId) {
      newErrors.portfolioId = "Please select a portfolio.";
    } else {
      const stocksInPortfolio = stocksByPortfolioId[portfolioId] || [];
      if (stocksInPortfolio.length >= 5) {
        newErrors.portfolioId = "Portfolio cannot have more than 5 stocks.";
      } else if (stocksInPortfolio.some(stock => stock.stock_symbol === symbol)) {
        newErrors.portfolioId = "Stock is already in portfolio.";
      } else if (addedStocksPort.has(`${portfolioId}-${symbol}`)) {
        newErrors.portfolioId = "Stock is already added to this portfolio.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const stockData = {
      stock_symbol: symbol,
      quantity: parseFloat(quantity),
      purchase_price: parseFloat(purchasePrice),
    };

    const serverResponse = dispatch(addPortfolioStockThunk(portfolioId, stockData));

    if (!serverResponse.errors) {
      addedStocksPort.add(`${portfolioId}-${symbol}`);
      dispatch(getPortfolioStocksThunk(portfolioId));
      closeModal();
    } else {
      setErrors(serverResponse.errors);
    }
  };

  return (
    <div className="login-form">
      <h1>Add to Portfolio</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Quantity
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        {errors.quantity && <p className="error">{errors.quantity}</p>}
        <label>
          Purchase Price
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            required
          />
        </label>
        {errors.purchasePrice && <p className="error">{errors.purchasePrice}</p>}
        <label>
          Portfolio
          <select
            value={portfolioId}
            onChange={(e) => setPortfolioId(e.target.value)}
            required
          >
            <option value="">Select Portfolio</option>
            {portfolios.map((portfolio) => (
              <option key={portfolio.id} value={portfolio.id}>
                {portfolio.name}
              </option>
            ))}
          </select>
        </label>
        {errors.portfolioId && <p className="error">{errors.portfolioId}</p>}
        <button className="login-form-button" type="submit">Add to Portfolio</button>
      </form>
    </div>
  );
}

export default AddToPortfolioModal;
