import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStock } from '../../redux/stock';
import { addPortfolioStockThunk } from '../../redux/portfolio';
import { addWatchlistStockThunk } from '../../redux/watchlist';
import { FaSpinner } from 'react-icons/fa';
import TradingViewWidget from '../SmartChart/TradingViewWidget';
import './StockDetails.css'

const StockDetails = () => {
    const [symbol, setSymbol] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const stock = useSelector((state) => state.stocks.stocks && state.stocks.stocks[symbol]);

    const handleInputChange = (e) => {
        setSymbol(e.target.value.toUpperCase());
    };

    const handleFetchDetails = async () => {
        if (symbol) {
            setLoading(true);
            await dispatch(fetchStock(symbol));
            setLoading(false);
        }
    };

    const handleAddToPortfolio = () => {
        const quantity = prompt('Enter quantity:');
        const purchasePrice = prompt('Enter purchase price:');
        if (quantity && purchasePrice) {
            const portfolioId = prompt('Enter portfolio ID:');
            dispatch(addPortfolioStockThunk(portfolioId, {
                stock_symbol: symbol,
                quantity: parseFloat(quantity),
                purchase_price: parseFloat(purchasePrice)
            }));
        }
    };

    const handleAddToWatchlist = () => {
        const watchlistId = prompt('Enter watchlist ID:');
        if (watchlistId) {
            dispatch(addWatchlistStockThunk(watchlistId, {
                stock_symbol: symbol,
                current_price: stock.current_price
            }));
        }
    };

    return (
        <div>
            <h1>Stock Details</h1>
            <input
                type="text"
                value={symbol}
                onChange={handleInputChange}
                placeholder="Enter stock symbol"
            />
            <button onClick={handleFetchDetails}>Get Stock Details</button>
            {loading ? (
                <div>
                    <FaSpinner className="spinner" />
                    <p>Loading...</p>
                </div>
            ) : stock ? (
                <div>
                    <h2>Stock Details for {stock.name}: {stock.symbol}</h2>
                    <p>Current Price: ${stock.current_price}</p>
                    <p>Market Cap: ${stock.market_cap}</p>
                    <p>PE Ratio: {stock.pe_ratio}</p>
                    <p>Dividend Yield: {stock.dividend_yield}</p>
                    <p>Volume: {stock.volume}</p>
                    <p>52 Week High: ${stock.week_52_high}</p>
                    <p>52 Week Low: ${stock.week_52_low}</p>
                    <p>Average Volume: {stock.average_volume}</p>
                    <button onClick={handleAddToPortfolio}>Add to Portfolio</button>
                    <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
                    <TradingViewWidget symbol={stock.symbol} />
                </div>
            ) : (
                <p>No stock details available. Enter a symbol and fetch the details.</p>
            )}
        </div>
    );
};

export default StockDetails;
