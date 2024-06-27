import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllWatchlistsThunk,
    getWatchlistStocksThunk,
    createWatchlistThunk,
    deleteWatchlistThunk,
    updateWatchlistThunk
} from '../../redux/watchlist';

const Watchlist = () => {
    const dispatch = useDispatch();
    const watchlists = useSelector((state) => state.watchlist.watchlists);
    const stocksByWatchlistId = useSelector((state) => state.watchlist.stocksByWatchlistId);

    useEffect(() => {
        dispatch(getAllWatchlistsThunk());
    }, [dispatch]);

    const handleCreateWatchlist = () => {
        const name = prompt('Enter watchlist name:');
        dispatch(createWatchlistThunk({ name }));
    };

    const handleUpdateWatchlist = (id) => {
        const name = prompt('Enter new watchlist name:');
        dispatch(updateWatchlistThunk(id, { name }));
    };

    const handleDeleteWatchlist = (id) => {
        dispatch(deleteWatchlistThunk(id));
    };

    const handleViewStocks = (watchlistId) => {
        dispatch(getWatchlistStocksThunk(watchlistId));
    };

    return (
        <div>
            <h1>Watchlists</h1>
            <button onClick={handleCreateWatchlist}>Create Watchlist</button>
            <ul>
                {watchlists.map((watchlist) => (
                    <li key={watchlist.id}>
                        <h2>{watchlist.name}</h2>
                        <button onClick={() => handleUpdateWatchlist(watchlist.id)}>Edit</button>
                        <button onClick={() => handleDeleteWatchlist(watchlist.id)}>Delete</button>
                        <button onClick={() => handleViewStocks(watchlist.id)}>View Stocks</button>
                        {stocksByWatchlistId[watchlist.id] && Array.isArray(stocksByWatchlistId[watchlist.id]) && (
                            <ul>
                                {stocksByWatchlistId[watchlist.id].map((stock) => (
                                    <li key={stock.id}>
                                        {stock.stock_symbol} - Current Price: ${stock.current_price}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Watchlist;
