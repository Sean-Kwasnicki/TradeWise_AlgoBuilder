
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStock } from '../../redux/stock';
import { FaSpinner } from 'react-icons/fa';
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
                </div>
            ) : (
                <p>No stock details available. Enter a symbol and fetch the details.</p>
            )}
        </div>
    );
};

export default StockDetails;
