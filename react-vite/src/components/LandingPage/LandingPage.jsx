import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import tradewise_logo from '../../../../images/tradewise_logo.jpg';
import './LandingPage.css';
import { getAllPortfoliosThunk, getPortfolioStocksThunk } from '../../redux/portfolio';
import { getAllWatchlistsThunk, getWatchlistStocksThunk } from '../../redux/watchlist';

const LandingPage = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const portfolios = await dispatch(getAllPortfoliosThunk());
    //         portfolios.forEach(portfolio => {
    //             dispatch(getPortfolioStocksThunk(portfolio.id));
    //         });

    //         const watchlists = await dispatch(getAllWatchlistsThunk());
    //         watchlists.forEach(watchlist => {
    //             dispatch(getWatchlistStocksThunk(watchlist.id));
    //         });
    //     };

    //     fetchData();
    // }, [dispatch]);

    return (
        <div className="landing-page">
            <div className="logo-container">
                <img src={tradewise_logo} alt="TradeWise Logo" className="logo" />
            </div>
            <div className="info-links">TradeWise</div>
        </div>
    );
};

export default LandingPage;
