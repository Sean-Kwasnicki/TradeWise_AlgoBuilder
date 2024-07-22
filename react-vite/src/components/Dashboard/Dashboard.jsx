import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Portfolio from '../Portfolios/Portfolios';
import Watchlist from '../Watchlists/Watchlists';
import DashboardTradingViewWidget from '../SmartChart/DashboardChart';
import StockNews from '../StockNews/StockNews';
import { FaSpinner } from 'react-icons/fa';
import { fetchStock } from '../../redux/stock';
import './Dashboard.css';

const Dashboard = () => {
    const [inputSymbol, setInputSymbol] = useState('');
    const [symbol, setSymbol] = useState('AAPL');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    // Preload data for 'AAPL' on component mount
    useEffect(() => {
        fetchData('AAPL');
    }, []);

    const handleInputChange = (e) => {
        setInputSymbol(e.target.value.toUpperCase().trim());
    };

    const fetchData = async (symbolToFetch) => {
        setLoading(true);
        setDataFetched(false);
        setError(null);

        try {
            const stockPromise = dispatch(fetchStock(symbolToFetch));
            // const newsResponse = await fetch(`/api/stocks/company_news/${symbolToFetch}`);

            // if (!newsResponse.ok) {
            //     throw new Error('Failed to fetch data, Please try a Valid Symbol');
            // }

            // const newsData = await newsResponse.json();
            await stockPromise;

            if (stockPromise.error) {
                throw new Error('Failed to fetch data, Please try a Valid Symbol');
            }

            setSymbol(symbolToFetch);
            setDataFetched(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateClick = () => {
        fetchData(inputSymbol);
    };

    return (
        <div className="dashboard">
            <div className="background-logo-compare"></div>
            <div className="sidebar">
                {user && <Portfolio />}
            </div>
            <div className="main-content">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={inputSymbol}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleUpdateClick}>
                        Search
                    </button>
                </div>
                {loading ? (
                    <div className="loading-section-research">
                        <FaSpinner className="spinner-research" />
                        <p>Loading...</p>
                    </div>
                ) : error ? (
                    <p>{error}</p>
                ) : dataFetched && (
                    <>
                        <div className="dashboard-chart-container">
                            <DashboardTradingViewWidget symbol={symbol} />
                        </div>
                        {/* <div className="dashboard-news-container">
                            <StockNews symbol={symbol} />
                        </div> */}
                    </>
                )}
            </div>
            <div className="sidebar">
                {user && <Watchlist />}
            </div>
        </div>
    );
};

export default Dashboard;
