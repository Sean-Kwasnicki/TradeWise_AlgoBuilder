import React from 'react';
import { Link } from 'react-router-dom';
import tradewise_logo from '../../../../images/tradewise_logo.jpg';
import './LandingPage.css';

const LandingPage = () => {
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
