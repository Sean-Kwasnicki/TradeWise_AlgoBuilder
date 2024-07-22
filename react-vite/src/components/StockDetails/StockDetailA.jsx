import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStock } from '../../redux/stock';
import { addPortfolioStockThunk, getPortfolioStocksThunk } from '../../redux/portfolio';
import { addWatchlistStockThunk, getWatchlistStocksThunk } from '../../redux/watchlist';
import { FaSpinner } from 'react-icons/fa';
import TradingViewMiniWidget from '../SmartChart/TradingViewMiniWidget';
import './StockDetail.css';
import AddToPortfolioModal from '../Research/AddToPortfolioModal';
import AddToWatchlistModal from '../Research/AddToWatchlistModal';
import { useModal } from '../../context/Modal';

const MAX_STOCKS = 5;

const StockDetailA = ({ symbol, detailType, portfolios, stocksByPortfolioId, watchlists, stocksByWatchlistId, addedStocksPort, addedStocksWL, stockCount, setStockCount }) => {
  const [loading, setLoading] = useState(false);
  const [visibleCharts, setVisibleCharts] = useState({});
  const dispatch = useDispatch();
  const stockA = useSelector((state) => state.stocks.stocks && state.stocks.stocks[symbol]);
  const user = useSelector((state) => state.session.user);
  const { setModalContent } = useModal();

  useEffect(() => {
    if (symbol) {
      const fetchData = async () => {
        setLoading(true);
        await dispatch(fetchStock(symbol));
        setLoading(false);
      };
      fetchData();
    }
  }, [dispatch, symbol]);

  const handleAddToPortfolio = (portfolioId) => {
    if (stockCount < MAX_STOCKS) {
      addedStocksPort.add(symbol);
      dispatch(addPortfolioStockThunk(portfolioId, { symbol })).then(() => {
        setStockCount(stockCount + 1);
        dispatch(getPortfolioStocksThunk(portfolioId));
      });
    } else {
      alert(`Cannot add more than ${MAX_STOCKS} stocks to the portfolio.`);
    }
  };

  const handleAddToWatchlist = (watchlistId) => {
    if (addedStocksWL.size < MAX_STOCKS) {
      addedStocksWL.add(symbol);
      dispatch(addWatchlistStockThunk(watchlistId, { symbol })).then(() => {
        dispatch(getWatchlistStocksThunk(watchlistId));
      });
    } else {
      alert(`Cannot add more than ${MAX_STOCKS} stocks to the watchlist.`);
    }
  };

  const toggleChartVisibility = (symbol) => {
    setVisibleCharts((prev) => ({
      ...prev,
      [symbol]: !prev[symbol],
    }));
  };

  return (
    <div className={`stock-detail stock-detail-${detailType}`}>
      {loading ? (
        <div>
          <FaSpinner className="spinner" />
          <p>Loading...</p>
        </div>
      ) : stockA ? (
        <div>
          <h2>Stock Details for {stockA.name}: {stockA.symbol}</h2>
          <p>Current Price: ${stockA.current_price}</p>
          <p>52 Week High: ${stockA.week_52_high}</p>
          <p>52 Week Low: ${stockA.week_52_low}</p>
          <div className="buttons">
            {user && (
              <>
                <button onClick={() => setModalContent(<AddToPortfolioModal symbol={symbol} portfolios={portfolios} stocksByPortfolioId={stocksByPortfolioId} addedStocksPort={addedStocksPort} handleAddToPortfolio={handleAddToPortfolio} />)}>Add to Portfolio</button>
                <button onClick={() => setModalContent(<AddToWatchlistModal symbol={symbol} watchlists={watchlists} stocksByWatchlistId={stocksByWatchlistId} addedStocksWL={addedStocksWL} handleAddToWatchlist={handleAddToWatchlist} />)}>Add to Watchlist</button>
              </>
            )}
            <button onClick={() => toggleChartVisibility(stockA.symbol)}>
              {visibleCharts[stockA.symbol] ? 'Hide Chart' : 'View Chart'}
            </button>
          </div>
          {visibleCharts[stockA.symbol] && (
            <TradingViewMiniWidget
              symbol={stockA.symbol}
              containerId={`tradingview_widget_${detailType}_${stockA.symbol}`}
            />
          )}
        </div>
      ) : (
        <p>No stock details available for {symbol}. Enter a valid symbol and fetch the details.</p>
      )}
    </div>
  );
};

export default StockDetailA;
