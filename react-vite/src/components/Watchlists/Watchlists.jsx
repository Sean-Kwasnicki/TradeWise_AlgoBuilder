import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllWatchlistsThunk,
    getWatchlistStocksThunk,
    deleteWatchlistStockThunk,
    deleteWatchlistThunk,
    createWatchlistThunk
} from '../../redux/watchlist';
import TradingViewMiniWidget from '../SmartChart/TradingViewMiniWidget';
import { FaSpinner } from 'react-icons/fa';

const Watchlist = () => {
    const dispatch = useDispatch();
    const watchlists = useSelector((state) => state.watchlist.watchlists);
    const stocksByWatchlistId = useSelector((state) => state.watchlist.stocksByWatchlistId);
    const [loading, setLoading] = useState({});
    const [visibleStocks, setVisibleStocks] = useState({});
    const [visibleCharts, setVisibleCharts] = useState({});

    useEffect(() => {
        dispatch(getAllWatchlistsThunk());
    }, [dispatch]);

    const handleViewStocks = (watchlistId) => {
        if (visibleStocks[watchlistId]) {
            setVisibleStocks((prev) => ({ ...prev, [watchlistId]: false }));
        } else {
            setLoading((prev) => ({ ...prev, [watchlistId]: true }));
            dispatch(getWatchlistStocksThunk(watchlistId)).then(() => {
                setLoading((prev) => ({ ...prev, [watchlistId]: false }));
                setVisibleStocks((prev) => ({ ...prev, [watchlistId]: true }));
            });
        }
    };

    const toggleChartVisibility = (watchlistId, stockSymbol) => {
        setVisibleCharts((prev) => ({
            ...prev,
            [`${watchlistId}-${stockSymbol}`]: !prev[`${watchlistId}-${stockSymbol}`]
        }));
    };

    const handleDeleteStock = (watchlistId, stockId) => {
        dispatch(deleteWatchlistStockThunk(watchlistId, stockId));
    };

    const handleDeleteWatchlist = (watchlistId) => {
        dispatch(deleteWatchlistThunk(watchlistId));
    };

    const handleCreateWatchlist = () => {
        const name = prompt('Enter watchlist name:');
        dispatch(createWatchlistThunk({ name }));
    };

    return (
        <div>
            <h1>Watchlists</h1>
            <button onClick={handleCreateWatchlist}>Create Watchlist</button>
            <ul>
                {watchlists.map((watchlist) => (
                    <li key={watchlist.id}>
                        <h2>{watchlist.name}</h2>
                        <button onClick={() => handleViewStocks(watchlist.id)}>
                            {visibleStocks[watchlist.id] ? 'Hide Stocks' : 'View Stocks'}
                        </button>
                        <button onClick={() => handleDeleteWatchlist(watchlist.id)}>Delete Watchlist</button>
                        {loading[watchlist.id] ? (
                            <div>
                                <FaSpinner className="spinner" />
                                <p>Loading...</p>
                            </div>
                        ) : (
                            visibleStocks[watchlist.id] && (
                                <ul>
                                    {stocksByWatchlistId[watchlist.id]?.map((stock) => (
                                        <li key={stock.id}>
                                            {stock.stock_symbol} - Current Price: ${stock.current_price}
                                            <button onClick={() => toggleChartVisibility(watchlist.id, stock.stock_symbol)}>
                                                {visibleCharts[`${watchlist.id}-${stock.stock_symbol}`] ? 'Hide Chart' : 'View Chart'}
                                            </button>
                                            <button onClick={() => handleDeleteStock(watchlist.id, stock.id)}>Delete Stock</button>
                                            {visibleCharts[`${watchlist.id}-${stock.stock_symbol}`] && (
                                                <TradingViewMiniWidget
                                                    symbol={stock.stock_symbol}
                                                    containerId={`tradingview_widget_${watchlist.id}_${stock.stock_symbol}`}
                                                />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Watchlist;
