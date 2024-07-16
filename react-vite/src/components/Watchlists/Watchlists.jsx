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
import './Watchlists.css';
import { useModal } from '../../context/Modal';
import WatchlistModal from './WatchlistModal';
import UpdateWatchlistModal from './UpdateWatchlistModal';
import DeleteWatchlistModal from './DeleteWatchlistModal';
import DeleteWatchlistStockModal from './DeleteWatchlistStockModal';

const Watchlist = () => {
    const dispatch = useDispatch();
    const watchlists = useSelector((state) => state.watchlist.watchlists);
    const stocksByWatchlistId = useSelector((state) => state.watchlist.stocksByWatchlistId);
    const [loading, setLoading] = useState({});
    const [visibleStocks, setVisibleStocks] = useState({});
    const [visibleCharts, setVisibleCharts] = useState({});
    const { setModalContent } = useModal();

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
        setModalContent(<DeleteWatchlistStockModal watchlistId={watchlistId} stockId={stockId} />);
    };


    const handleDeleteWatchlist = (watchlistId) => {
        setModalContent(<DeleteWatchlistModal watchlistId={watchlistId} />);
    };


    const handleCreateWatchlist = () => {
        setModalContent(<WatchlistModal />);
    };

    const handleUpdateWatchlist = (watchlistId, currentName) => {
        setModalContent(<UpdateWatchlistModal watchlistId={watchlistId} currentName={currentName} />);
    };

    return (
        <div className="watchlist-container">
            <div className="background-logo-compare"></div>
            <h1>Watchlists</h1>
            <button className="create-watchlist-btn" onClick={handleCreateWatchlist}>Create Watchlist</button>
            <ul className="watchlist-list">
                {watchlists.map((watchlist) => (
                    <li key={watchlist.id} className="watchlist-item">
                        <h2>{watchlist.name}</h2>
                        <div className="watchlist-buttons">
                            <button onClick={() => handleViewStocks(watchlist.id)}>
                                {visibleStocks[watchlist.id] ? 'Hide Stocks' : 'View Stocks'}
                            </button>
                            <button onClick={() => handleUpdateWatchlist(watchlist.id, watchlist.name)}>Edit Watchlist</button>
                            <button onClick={() => handleDeleteWatchlist(watchlist.id)}>Delete Watchlist</button>
                        </div>
                        {loading[watchlist.id] ? (
                            <div className="loading-container">
                                <FaSpinner className="spinner" />
                                <p>Loading...</p>
                            </div>
                        ) : (
                            visibleStocks[watchlist.id] && (
                                <ul className="stocks-list">
                                    {stocksByWatchlistId[watchlist.id]?.map((stock) => (
                                        <li key={stock.id} className="stock-item">
                                            {stock.stock_symbol} - Current Price: ${stock.current_price}
                                            <div className="stock-buttons">
                                                <button onClick={() => toggleChartVisibility(watchlist.id, stock.stock_symbol)}>
                                                    {visibleCharts[`${watchlist.id}-${stock.stock_symbol}`] ? 'Hide Chart' : 'View Chart'}
                                                </button>
                                                <button onClick={() => handleDeleteStock(watchlist.id, stock.id)}>Delete Stock</button>
                                            </div>
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
