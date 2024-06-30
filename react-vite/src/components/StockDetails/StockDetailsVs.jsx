import React, { useState } from 'react';
import StockDetailA from './StockDetailA';
import StockDetailB from './StockDetailB';
import './StockDetailsVs.css';

const StockDetailsVs = () => {
    const [symbolA, setSymbolA] = useState('');
    const [symbolB, setSymbolB] = useState('');
    const [showComparison, setShowComparison] = useState(false);

    const handleCompare = () => {
        setShowComparison(true);
    };

    const handleReset = () => {
        setSymbolA('');
        setSymbolB('');
        setShowComparison(false);
    };

    return (
        <div className="stock-details-vs">
            <h1>Compare Stocks</h1>
            <input
                type="text"
                value={symbolA}
                onChange={(e) => setSymbolA(e.target.value.toUpperCase())}
                placeholder="Enter first stock symbol"
            />
            <input
                type="text"
                value={symbolB}
                onChange={(e) => setSymbolB(e.target.value.toUpperCase())}
                placeholder="Enter second stock symbol"
            />
            <button onClick={handleCompare}>Compare</button>
            <button onClick={handleReset}>Reset</button>
            {showComparison && (
                <div className="comparison-container">
                    <StockDetailA symbol={symbolA} />
                    <div className="vs-divider">VS</div>
                    <StockDetailB symbol={symbolB} />
                </div>
            )}
        </div>
    );
};

export default StockDetailsVs;
