import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import tradewise_logo from '../../../../images/tradewise_logo4.png';
import './LandingPage.css';
import { getAllPortfoliosThunk, getPortfolioStocksThunk } from '../../redux/portfolio';
import { getAllWatchlistsThunk, getWatchlistStocksThunk } from '../../redux/watchlist';

const LandingPage = () => {

    return (
        <div className="landing-page">
            <div className="logo-container">
                <img src={tradewise_logo} alt="TradeWise Logo" className="logo" />
            </div>
        </div>
    );
};

export default LandingPage;
