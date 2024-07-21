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
    const [visibleCharts, setVisibleCharts] = useState({});
    const { setModalContent } = useModal();

    useEffect(() => {
        dispatch(getAllWatchlistsThunk());
    }, [dispatch]);

    useEffect(() => {
        watchlists.forEach(watchlist => {
            setLoading((prev) => ({ ...prev, [watchlist.id]: true }));
            dispatch(getWatchlistStocksThunk(watchlist.id)).then(() => {
                setLoading((prev) => ({ ...prev, [watchlist.id]: false }));
            });
        });
    }, [watchlists, dispatch]);

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
            <h3>Limit 5 stocks per Watchlist</h3>
            <button className="create-watchlist-btn" onClick={handleCreateWatchlist}>Create Watchlist</button>
            <ul className="watchlist-list">
                {watchlists.map((watchlist) => {
                    const hasStocks = stocksByWatchlistId[watchlist.id] && stocksByWatchlistId[watchlist.id].length > 0;

                    return (
                        <li key={watchlist.id} className="watchlist-item">
                            <h2>{watchlist.name}</h2>
                            <div className="watchlist-buttons">
                                <button onClick={() => handleUpdateWatchlist(watchlist.id, watchlist.name)}>Edit Watchlist</button>
                                <button onClick={() => handleDeleteWatchlist(watchlist.id)}>Delete Watchlist</button>
                            </div>
                            {loading[watchlist.id] ? (
                                <div className="loading-container">
                                    <FaSpinner className="spinner" />
                                    <p>Loading...</p>
                                </div>
                            ) : (
                                hasStocks ? (
                                    <ul className="stocks-list">
                                        {stocksByWatchlistId[watchlist.id]?.map((stock) => (
                                            <li key={stock.id} className="stock-item">
                                                {stock.stock_symbol}
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
                                ) : (
                                    <p>Please add to watchlist</p>
                                )
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Watchlist;
