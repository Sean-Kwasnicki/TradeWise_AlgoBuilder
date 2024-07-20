import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStock } from '../../redux/stock';
import { addPortfolioStockThunk, getAllPortfoliosThunk } from '../../redux/portfolio';
import { addWatchlistStockThunk, getAllWatchlistsThunk } from '../../redux/watchlist';
import { FaSpinner } from 'react-icons/fa';
import TradingViewMiniWidget from '../SmartChart/TradingViewMiniWidget';
import './StockDetail.css';
import AddToPortfolioModal from '../Research/AddToPortfolioModal';
import AddToWatchlistModal from '../Research/AddToWatchlistModal';
import { useModal } from '../../context/Modal';

// const stockCache = {};
const addedStocksPort = new Set();
const addedStocksWL = new Set();

const StockDetailA = ({ symbol, detailType, isWinner }) => {
    const [loading, setLoading] = useState(false);
    const [visibleCharts, setVisibleCharts] = useState({});
    const dispatch = useDispatch();
    const stockA = useSelector((state) => state.stocks.stocks && state.stocks.stocks[symbol]);
    const portfolios = useSelector((state) => state.portfolio.portfolios);
    const watchlists = useSelector((state) => state.watchlist.watchlists);
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


    const handleAddToPortfolio = () => {
        setModalContent(<AddToPortfolioModal symbol={symbol} addedStocksPort={addedStocksPort} />);
      };
      const handleAddToWatchlist = () => {
        setModalContent(<AddToWatchlistModal symbol={symbol} currentPrice={stockA.current_price} addedStocksWL={addedStocksWL}/>);
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
                    {/* <p>Market Cap: ${stockB.market_cap}</p>
                    <p>PE Ratio: {stockB.pe_ratio}</p>
                    <p>Dividend Yield: {stockB.dividend_yield}</p> */}
                    <p>52 Week High: ${stockA.week_52_high}</p>
                    <p>52 Week Low: ${stockA.week_52_low}</p>
                    <div className="buttons">
                    { user && (
                        <>
                            <button onClick={handleAddToPortfolio}>Add to Portfolio</button>
                            <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
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
