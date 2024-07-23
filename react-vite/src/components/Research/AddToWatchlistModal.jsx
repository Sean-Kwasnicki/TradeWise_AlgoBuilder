import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWatchlistStockThunk, getWatchlistStocksThunk } from '../../redux/watchlist';
import { useModal } from '../../context/Modal';
import { FaSpinner } from 'react-icons/fa';
import "../LoginFormModal/LoginForm.css";

function AddToWatchlistModal({ symbol, watchlists, stocksByWatchlistId, addedStocksWL }) {
  const dispatch = useDispatch();
  const [watchlistId, setWatchlistId] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!watchlistId) {
      newErrors.watchlistId = "Please select a watchlist.";
    } else {
      const stocksInWatchlist = stocksByWatchlistId[watchlistId] || [];
      if (stocksInWatchlist.length >= 5) {
        newErrors.watchlistId = "Watchlist cannot have more than 5 stocks.";
      } else if (stocksInWatchlist.some(stock => stock.stock_symbol === symbol)) {
        newErrors.watchlistId = "Stock is already in watchlist.";
      } else if (addedStocksWL.has(`${watchlistId}-${symbol}`)) {
        newErrors.watchlistId = "Stock is already added to this watchlist.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    const stockData = {
      stock_symbol: symbol,
    };

    const serverResponse = await dispatch(addWatchlistStockThunk(watchlistId, stockData));

    if (!serverResponse.errors) {
      addedStocksWL.add(`${watchlistId}-${symbol}`);
      await dispatch(getWatchlistStocksThunk(watchlistId));
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
          <h1>Add to Watchlist</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Watchlist
              <select
                value={watchlistId}
                onChange={(e) => setWatchlistId(e.target.value)}
                required
                disabled={submitting}
              >
                <option value="">Select Watchlist</option>
                {watchlists.map((watchlist) => (
                  <option key={watchlist.id} value={watchlist.id}>
                    {watchlist.name}
                  </option>
                ))}
              </select>
            </label>
            {errors.watchlistId && <p className="error">{errors.watchlistId}</p>}
            <button className="login-form-button" type="submit" disabled={submitting}>Add to Watchlist</button>
          </form>
        </>
      )}
    </div>
  );
}

export default AddToWatchlistModal;
