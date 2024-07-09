import React, { useState } from 'react';
import Portfolio from '../Portfolios/Portfolios';
import Watchlist from '../Watchlists/Watchlists';
import TradingViewWidget from '../SmartChart/TradingViewWidget';
import StockNews from '../StockNews/StockNews';
import './Dashboard.css';

const Dashboard = () => {
    const [inputSymbol, setInputSymbol] = useState('');
    const [symbol, setSymbol] = useState('SPY');

    const handleInputChange = (e) => {
        setInputSymbol(e.target.value.toUpperCase());
    };

    const handleUpdateClick = () => {
        setSymbol(inputSymbol);
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <Portfolio />
            </div>
            <div className="main-content">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={inputSymbol}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleUpdateClick}>Search</button>
                </div>
                <div className="chart-container">
                    <TradingViewWidget symbol={symbol} />
                </div>
                <div className="news-container">
                    <StockNews symbol={symbol} />
                </div>
            </div>
            <div className="sidebar">
                <Watchlist />
            </div>
        </div>
    );
};

export default Dashboard;
