import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStock } from '../../redux/stock';
import { getAllPortfoliosThunk } from '../../redux/portfolio';
import { getAllWatchlistsThunk } from '../../redux/watchlist';
import { FaSpinner } from 'react-icons/fa';
import TradingViewMiniWidget from '../SmartChart/TradingViewMiniWidget';
import AddToPortfolioModal from '../Research/AddToPortfolioModal';
import AddToWatchlistModal from '../Research/AddToWatchlistModal';
import { useModal } from '../../context/Modal';
import './StockDetail.css';

const StockDetailA = ({ symbol, detailType, isWinner }) => {
    const [loading, setLoading] = useState(false);
    const [visibleCharts, setVisibleCharts] = useState({});
    const dispatch = useDispatch();
    const stockA = useSelector((state) => state.stocks.stocks && state.stocks.stocks[symbol]);
    const { setModalContent, closeModal } = useModal();

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

    const handleAddToPortfolio = async () => {
        dispatch(getAllPortfoliosThunk());
        setModalContent(<AddToPortfolioModal symbol={symbol} closeModal={closeModal} />);
    };

    const handleAddToWatchlist = async () => {
        dispatch(getAllWatchlistsThunk());
        setModalContent(<AddToWatchlistModal symbol={symbol} currentPrice={stockA.current_price} closeModal={closeModal} />);
    };

    const toggleChartVisibility = (symbol) => {
        setVisibleCharts((prev) => ({
            ...prev,
            [symbol]: !prev[symbol]
        }));
    };

    return (
        <div className={`stock-detail ${isWinner ? 'winner' : ''} stock-detail-${detailType}`}>
            {loading ? (
                <div>
                    <FaSpinner className="spinner" />
                    <p>Loading...</p>
                </div>
            ) : stockA ? (
                <div>
                    <h2>Stock Details for {stockA.name}: {stockA.symbol}</h2>
                    <p>Current Price: ${stockA.current_price}</p>
                    <p>Market Cap: ${stockA.market_cap}</p>
                    <p>PE Ratio: {stockA.pe_ratio}</p>
                    <p>Dividend Yield: {stockA.dividend_yield}</p>
                    <p>52 Week High: ${stockA.week_52_high}</p>
                    <p>52 Week Low: ${stockA.week_52_low}</p>
                    <div className="buttons">
                      <button onClick={handleAddToPortfolio}>Add to Portfolio</button>
                      <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
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
