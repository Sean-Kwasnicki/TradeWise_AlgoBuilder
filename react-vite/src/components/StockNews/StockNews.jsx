import React, { useEffect, useState } from 'react';


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
                const err = await response.json();
                setError(err.errors || 'Failed to fetch stock details');
                setLoading(false);
            }
        } catch (error) {
            setError('Failed to fetch stock details');
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
                const err = await response.json();
                setError(err.errors || 'Failed to fetch news');
            }
        } catch (error) {
            setError('Failed to fetch news');
        }
        setLoading(false);
    };

    return (
        <div className="stock-news">
            <h2>Latest News for {companyName || symbol}</h2>
            {loading ? (
                <p>Loading news...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="news-container">
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
