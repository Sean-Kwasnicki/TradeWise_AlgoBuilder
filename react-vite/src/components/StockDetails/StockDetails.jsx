import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStock } from '../../redux/stock';

const StockDetails = () => {
    const [symbol, setSymbol] = useState('');
    const dispatch = useDispatch();
    const stock = useSelector((state) => state.stocks.stock);

    const handleInputChange = (e) => {
        setSymbol(e.target.value);
    };

    const handleFetchDetails = () => {
        if (symbol) {
            dispatch(fetchStock(symbol));
        }
    };

    return (
        <div>
            <input
                type="text"
                value={symbol}
                onChange={handleInputChange}
                placeholder="Enter stock symbol"
            />
            <button onClick={handleFetchDetails}>Get Stock Details</button>
            {stock && (
                <div>
                    <h2>Stock Details for {stock.symbol}</h2>
                    <p>Current Price: ${stock.current_price}</p>
                    <p>Market Cap: ${stock.market_cap}</p>
                    <p>PE Ratio: {stock.pe_ratio}</p>
                    <p>Dividend Yield: {stock.dividend_yield}</p>
                    <p>Volume: {stock.volume}</p>
                    <p>52 Week High: ${stock.week_52_high}</p>
                    <p>52 Week Low: ${stock.week_52_low}</p>
                    <p>Average Volume: {stock.average_volume}</p>
                </div>
            )}
        </div>
    );
};

export default StockDetails;