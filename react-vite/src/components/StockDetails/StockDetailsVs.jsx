import React, { useState } from 'react';
import StockDetailA from './StockDetailA';
import StockDetailB from './StockDetailB';
import RoiComparison from '../ROIComparison/ROIComparison';
import './StockDetailsVs.css';

const StockDetailsVs = () => {
    const [symbolA, setSymbolA] = useState('');
    const [symbolB, setSymbolB] = useState('');
    const [showComparison, setShowComparison] = useState(false);
    const [winner, setWinner] = useState('');

    const handleCompare = () => {
        setShowComparison(true);
    };

    const handleReset = () => {
        setSymbolA('');
        setSymbolB('');
        setShowComparison(false);
        setWinner('');
    };

    const handleSetWinner = (winnerSymbol) => {
        setWinner(winnerSymbol);
    };

    return (
        <div className="stock-details-vs">
            <h1>Compare Stocks</h1>
            <input
                type="text"
                value={symbolA}
                onChange={(e) => setSymbolA(e.target.value.toUpperCase())}
                placeholder="Enter first stock symbol"
                disabled={showComparison}
            />
            <input
                type="text"
                value={symbolB}
                onChange={(e) => setSymbolB(e.target.value.toUpperCase())}
                placeholder="Enter second stock symbol"
                disabled={showComparison}
            />
            <button className="button" onClick={handleCompare} disabled={showComparison}>Compare</button>
            <button className="button" onClick={handleReset}>Reset</button>
            {showComparison && (
                <div className="comparison-container">
                    <div className="roi-comparison">
                        <RoiComparison symbolA={symbolA} symbolB={symbolB} onSetWinner={handleSetWinner} />
                    </div>
                    <div className="stock-detail-wrapper">
                        <StockDetailA symbol={symbolA} detailType="A" isWinner={winner === symbolA} />
                        <div className="vs-divider">VS</div>
                        <StockDetailB symbol={symbolB} detailType="B" isWinner={winner === symbolB} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockDetailsVs;
