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


const StockDetailB = ({ symbol, detailType, isWinner }) => {
    const [loading, setLoading] = useState(false);
    const [visibleCharts, setVisibleCharts] = useState({});
    const dispatch = useDispatch();
    const stockB = useSelector((state) => state.stocks.stocks && state.stocks.stocks[symbol]);
    const portfolios = useSelector((state) => state.portfolio.portfolios);
    const watchlists = useSelector((state) => state.watchlist.watchlists);
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

    // const handleAddToPortfolio = async () => {
    //     const quantity = prompt('Enter quantity:');
    //     const purchasePrice = prompt('Enter purchase price:');
    //     if (quantity && purchasePrice) {
    //         const portfolioName = prompt('Enter portfolio name:');
    //         const portfolio = portfolios.find(p => p.name === portfolioName);
    //         if (portfolio) {
    //             const result = await dispatch(addPortfolioStockThunk(portfolio.id, {
    //                 stock_symbol: symbol,
    //                 quantity: parseFloat(quantity),
    //                 purchase_price: parseFloat(purchasePrice)
    //             }));
    //             if (result.error) {
    //                 alert('Failed to add stock to portfolio: ' + result.error);
    //             }
    //         } else {
    //             alert('Portfolio not found');
    //         }
    //     }
    // };

    const handleAddToPortfolio = () => {
        setModalContent(<AddToPortfolioModal symbol={symbol} />);
      };

      const handleAddToWatchlist = () => {
        setModalContent(<AddToWatchlistModal symbol={symbol} currentPrice={stockB.current_price} />);
      };

    // const handleAddToWatchlist = () => {
    //     const watchlistName = prompt('Enter watchlist name:');
    //     const watchlist = watchlists.find(w => w.name === watchlistName);
    //     if (watchlist) {
    //         dispatch(addWatchlistStockThunk(watchlist.id, {
    //             stock_symbol: symbol,
    //             current_price: stockB.current_price,
    //         }));
    //     } else {
    //         alert('Watchlist not found');
    //     }
    // };

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
            ) : stockB ? (
                <div>
                    <h2>Stock Details for {stockB.name}: {stockB.symbol}</h2>
                    <p>Current Price: ${stockB.current_price}</p>
                    <p>Market Cap: ${stockB.market_cap}</p>
                    <p>PE Ratio: {stockB.pe_ratio}</p>
                    <p>Dividend Yield: {stockB.dividend_yield}</p>
                    <p>52 Week High: ${stockB.week_52_high}</p>
                    <p>52 Week Low: ${stockB.week_52_low}</p>
                    <div className="buttons">
                      <button onClick={handleAddToPortfolio}>Add to Portfolio</button>
                      <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
                      <button onClick={() => toggleChartVisibility(stockB.symbol)}>
                        {visibleCharts[stockB.symbol] ? 'Hide Chart' : 'View Chart'}
                      </button>
                    </div>
                    {visibleCharts[stockB.symbol] && (
                        <TradingViewMiniWidget
                            symbol={stockB.symbol}
                            containerId={`tradingview_widget_${detailType}_${stockB.symbol}`}
                        />
                    )}
                </div>
            ) : (
                <p>No stock details available for {symbol}. Enter a valid symbol and fetch the details.</p>
            )}
        </div>
    );
};

export default StockDetailB;
