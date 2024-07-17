import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStock } from '../../redux/stock';
import { fetchHistoricalPrice } from '../../redux/stock_historical';
import { addPortfolioStockThunk, getAllPortfoliosThunk } from '../../redux/portfolio';
import { addWatchlistStockThunk, getAllWatchlistsThunk } from '../../redux/watchlist';
import { FaSpinner } from 'react-icons/fa';
import TradingViewWidget from '../SmartChart/TradingViewWidget';
import StockNews from '../StockNews/StockNews';
import './ResearchPage.css';
import { useModal } from '../../context/Modal';
import AddToPortfolioModal from './AddToPortfolioModal';
import AddToWatchlistModal from './AddToWatchlistModal';
import RoiComparison from '../ROIComparison/ROIComparison';

const ResearchPage = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [inputSymbol, setInputSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  const dispatch = useDispatch();
  const stock = useSelector((state) => state.stocks.stocks && state.stocks.stocks[symbol]);
  const historicalPrice = useSelector((state) => state.stockHistorical.historicalPrices[symbol]?.close_price);
  const portfolios = useSelector((state) => state.portfolio.portfolios);
  const watchlists = useSelector((state) => state.watchlist.watchlists);
  const user = useSelector((state) => state.session.user);
  const { setModalContent } = useModal();

  useEffect(() => {
    dispatch(fetchStock('AAPL'));
    dispatch(getAllPortfoliosThunk());
    dispatch(getAllWatchlistsThunk());
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const formattedDate = oneYearAgo.toISOString().split('T')[0];
    dispatch(fetchHistoricalPrice('AAPL', formattedDate));
  }, [dispatch]);

  const handleInputChange = (e) => {
    setInputSymbol(e.target.value.toUpperCase().trim());
  };

  const handleFetchDetails = async () => {
    if (inputSymbol && inputSymbol.trim()) {
      setLoading(true);
      setError(null);
      setDataFetched(false);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      const formattedDate = oneYearAgo.toISOString().split('T')[0];

      try {
        const stockPromise = dispatch(fetchStock(inputSymbol));
        const historicalPricePromise = dispatch(fetchHistoricalPrice(inputSymbol, formattedDate));

        await Promise.all([stockPromise, historicalPricePromise]);

        if (stockPromise) {
          setSymbol(inputSymbol);
        } else {
          throw new Error('Failed to fetch data, Please try a Valid Symbol');
        }
      } catch (err) {
        setError('Failed to fetch data, Please try a Valid Symbol');
      } finally {
        setLoading(false);
        setDataFetched(true);
      }
    } else {
      setError('Failed to fetch data, Please try a Valid Symbol');
      setDataFetched(true);
    }
  };

  const handleAddToPortfolio = () => {
    setModalContent(<AddToPortfolioModal symbol={symbol} />);
  };

  const handleAddToWatchlist = () => {
    setModalContent(<AddToWatchlistModal symbol={symbol} currentPrice={stock.current_price} />);
  };

  const calculatePercentageGain = (currentPrice, historicalPrice) => {
    if (currentPrice && historicalPrice) {
      return ((currentPrice - historicalPrice) / historicalPrice * 100).toFixed(2);
    }
    return null;
  };

  return (
    <div className="research-page">
      <div className="background-logo-compare"></div>
      <div className="search-bar-research">
        <input
          type="text"
          value={inputSymbol}
          onChange={handleInputChange}
          placeholder="Enter stock symbol"
        />
        <button onClick={handleFetchDetails}>Search</button>
      </div>
      <div className="content">
        {loading ? (
          <div className="loading-section-research">
            <FaSpinner className="spinner-research" />
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {stock && stock.name ? (
              <>
                <div className="stock-details-section">
                  <div className="stock-details">
                    <h2>Stock Details for {stock.name}: {stock.symbol}</h2>
                    <p style={{ color: 'rgb(28,193,201)' }}>Current Price: ${stock.current_price}</p>
                    {historicalPrice && (
                      <>
                        <p style={{ color: 'rgb(28,193,201)' }}>Price 1 Year Ago: ${historicalPrice}</p>
                        <p style={{ color: 'rgb(28,193,201)' }}>Percentage Profit/Loss: {calculatePercentageGain(stock.current_price, historicalPrice)}%</p>
                      </>
                    )}
                    <p>52 Week High: ${stock.week_52_high}</p>
                    <p>52 Week Low: ${stock.week_52_low}</p>
                    <p>Market Cap: ${stock.market_cap}</p>
                    <p>PE Ratio: {stock.pe_ratio}</p>
                    <p>Dividend Yield: {stock.dividend_yield}</p>
                      {user && (
                        <>
                        <div className="buttons">
                         <button onClick={handleAddToPortfolio}>Add to Portfolio</button>
                         <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
                        </div>
                        </>
                      )}
                  </div>
                </div>
                <div className="chart-container">
                  <div className="tradingview-widget-container">
                    <TradingViewWidget symbol={symbol} />
                  </div>
                </div>
                <div className="stocknews-container">
                  <StockNews symbol={symbol} />
                </div>
              </>
            ) : (
              dataFetched && (
              <div className="error-message">
              <p>Failed to fetch data, Please try a Valid Symbol</p>
            </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResearchPage;
