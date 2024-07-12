import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import './StockNews.css';

const StockNews = ({ symbol }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [companyName, setCompanyName] = useState('');

    useEffect(() => {
        if (symbol) {
            fetchStockDetails(symbol);
        }
    }, [symbol]);

    const fetchStockDetails = async (symbol) => {
        try {
            const response = await fetch(`/api/stocks/symbol/${symbol}`);
            if (response.ok) {
                const data = await response.json();
                setCompanyName(data.name);
                fetchNews(data.name);
            } else {
                throw new Error('Invalid symbol');
            }
        } catch (error) {
            setError('Invalid symbol');
            setLoading(false);
        }
    };

    const fetchNews = async (companyName) => {
        try {
            const response = await fetch(`/api/stocks/company_news/${companyName}`);
            if (response.ok) {
                const data = await response.json();
                setNews(data);
                setError(null);
            } else {
                throw new Error('Invalid symbol');
            }
        } catch (error) {
            setError('Invalid symbol');
        }
        setLoading(false);
    };

    return (
        <div className="stock-news">
            {loading ? (
                <div className="loading-section-news">
                    <FaSpinner className="spinner" />
                    <p>Loading news...</p>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="news-container">
                    <h2>{error ? 'Invalid symbol' : `Latest News for ${companyName || symbol}`}</h2>
                    <ul>
                        {news.map((article, index) => (
                            <li key={index}>
                                <a href={article.link} target="_blank" rel="noopener noreferrer">
                                    {article.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StockNews;
