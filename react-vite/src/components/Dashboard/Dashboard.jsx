import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Portfolio from '../Portfolios/Portfolios';
import Watchlist from '../Watchlists/Watchlists';
import DashboardTradingViewWidget from '../SmartChart/DashboardChart';
import StockNews from '../StockNews/StockNews';
import { FaSpinner } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
    const [inputSymbol, setInputSymbol] = useState('');
    const [symbol, setSymbol] = useState('SPY');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const trimmedValue = e.target.value.toUpperCase().trim();
        setInputSymbol(trimmedValue);
    };

    const handleUpdateClick = async () => {
        if (inputSymbol) {
            setLoading(true);
            setError(null);
            setDataFetched(false); 

            try {
                const chartPromise = new Promise((resolve, reject) => {
                    resolve(<DashboardTradingViewWidget symbol={inputSymbol} />);
                });

                const newsPromise = new Promise((resolve, reject) => {
                    resolve(<StockNews symbol={inputSymbol} />);
                });

                await Promise.all([chartPromise, newsPromise]);

                setSymbol(inputSymbol);
                setDataFetched(true);
            } catch (err) {
                setError('Invalid symbol');
                setDataFetched(true);
            } finally {
                setLoading(false);
            }
        } else {
            setError('Invalid symbol');
            setDataFetched(true);
        }
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                {user && (
                    <Portfolio />
                )}
            </div>
            <div className="main-content">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={inputSymbol}
                        onChange={handleInputChange}
                    />
                    <button
                        onClick={handleUpdateClick}
                        disabled={!inputSymbol}
                    >
                        Search
                    </button>
                </div>
                <div className="dashboard-chart-container">
                    {loading ? (
                        <div className="loading-section-dashboard">
                            <FaSpinner className="spinner-dashboard" />
                            <p>Loading...</p>
                        </div>
                    ) : (
                        dataFetched && error ? (
                            <p>{error}</p>
                        ) : (
                            <DashboardTradingViewWidget symbol={symbol} />
                        )
                    )}
                </div>
                <div className="dashboard-news-container">
                    {loading ? (
                        <div className="loading-section-dashboard">
                            <FaSpinner className="spinner-dashboard" />
                            <p>Loading...</p>
                        </div>
                    ) : (
                        dataFetched && error ? (
                            <p>{error}</p>
                        ) : (
                            <StockNews symbol={symbol} />
                        )
                    )}
                </div>
            </div>
            <div className="sidebar">
                {user && (
                    <Watchlist />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
