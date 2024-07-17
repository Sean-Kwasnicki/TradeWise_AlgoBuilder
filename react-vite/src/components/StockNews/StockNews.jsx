import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import './StockNews.css';

const StockNews = ({ symbol }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (symbol) {
            fetchNews(symbol);  
        }
    }, [symbol]);

    const fetchNews = async (symbol) => {
        try {
            const response = await fetch(`/api/stocks/company_news/${symbol}`);
            if (response.ok) {
                const data = await response.json();
                setNews(data);
                setError(null);
            } else {
                throw new Error('Failed to fetch news');
            }
        } catch (error) {
            setError('Failed to fetch news');
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
                    <h2>{error ? 'Failed to fetch news' : `Latest News for ${symbol}`}</h2>
                    <ul>
                        {news.map((article, index) => (
                            <li key={index}>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    {article.headline}
                                </a>
                                <p>{article.summary}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StockNews;
