import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPortfolioStockThunk, getPortfolioStocksThunk } from '../../redux/portfolio';
import { useModal } from '../../context/Modal';
import { FaSpinner } from 'react-icons/fa';
import "../LoginFormModal/LoginForm.css";

const AddToPortfolioModal = ({ symbol, portfolios, stocksByPortfolioId, addedStocksPort }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [portfolioId, setPortfolioId] = useState("");
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
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
            const currentStockCount = stocksInPortfolio.length + (addedStocksPort.has(`${portfolioId}-${symbol}`) ? 0 : 1);

            if (currentStockCount > 5) {
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

        setSubmitting(true);
        const stockData = {
            stock_symbol: symbol,
            quantity: parseFloat(quantity),
            purchase_price: parseFloat(purchasePrice),
        };

        const serverResponse = await dispatch(addPortfolioStockThunk(portfolioId, stockData));

        if (!serverResponse.errors) {
            addedStocksPort.add(`${portfolioId}-${symbol}`);
            await dispatch(getPortfolioStocksThunk(portfolioId));
            closeModal();
        } else {
            setErrors(serverResponse.errors);
            setSubmitting(false);
        }
    };

    return (
        <div className="login-form">
            {submitting ? (
                <div className="loading-container">
                    <FaSpinner className="spinner" />
                    <p>Adding stock...</p>
                </div>
            ) : (
                <>
                    <h1>Add to Portfolio</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Quantity
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                                disabled={submitting}
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
                                disabled={submitting}
                            />
                        </label>
                        {errors.purchasePrice && <p className="error">{errors.purchasePrice}</p>}
                        <label>
                            Portfolio
                            <select
                                value={portfolioId}
                                onChange={(e) => setPortfolioId(e.target.value)}
                                required
                                disabled={submitting}
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
                        <button id="submit-button" className="login-form-button" type="submit" disabled={submitting}>Add to Portfolio</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default AddToPortfolioModal;
