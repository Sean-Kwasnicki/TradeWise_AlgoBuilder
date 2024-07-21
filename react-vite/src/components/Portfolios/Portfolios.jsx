import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllPortfoliosThunk,
    getPortfolioStocksThunk,
    deletePortfolioStockThunk,
    deletePortfolioThunk,
    createPortfolioThunk
} from '../../redux/portfolio';
import TradingViewMiniWidget from '../SmartChart/TradingViewMiniWidget';
import { FaSpinner } from 'react-icons/fa';
import './Portfolios.css';
import { useModal } from '../../context/Modal';
import PortfolioFormModal from './PortfolioFormModal';
import UpdatePortfolioModal from './UpdatePortfolioModal';
import DeletePortfolioModal from './DeletePortfolioModal';
import UpdateStockModal from './UpdateStockModal';
import DeleteStockModal from './DeleteStockModal';

// Simple cache to store fetched stocks by portfolio ID
const stocksCache = {};

const Portfolio = () => {
    const dispatch = useDispatch();
    const portfolios = useSelector((state) => state.portfolio.portfolios);
    const stocksByPortfolioId = useSelector((state) => state.portfolio.stocksByPortfolioId);
    const [loading, setLoading] = useState({});
    const [visibleCharts, setVisibleCharts] = useState({});
    const { setModalContent, closeModal } = useModal();

    useEffect(() => {
        dispatch(getAllPortfoliosThunk());
    }, [dispatch]);

    const fetchStocksForPortfolio = useCallback((portfolioId) => {
        if (!stocksCache[portfolioId]) {
            setLoading((prev) => ({ ...prev, [portfolioId]: true }));
            dispatch(getPortfolioStocksThunk(portfolioId)).then(() => {
                stocksCache[portfolioId] = true;
                setLoading((prev) => ({ ...prev, [portfolioId]: false }));
            });
        }
    }, [dispatch]);

    useEffect(() => {
        portfolios.forEach(portfolio => {
            fetchStocksForPortfolio(portfolio.id);
        });
    }, [portfolios, fetchStocksForPortfolio]);

    const toggleChartVisibility = (portfolioId, stockSymbol) => {
        setVisibleCharts((prev) => ({
            ...prev,
            [`${portfolioId}-${stockSymbol}`]: !prev[`${portfolioId}-${stockSymbol}`]
        }));
    };

    const handleDeleteStock = (portfolioId, stockId) => {
        setModalContent(<DeleteStockModal portfolioId={portfolioId} stockId={stockId}/>);
    };

    const handleUpdateStock = (portfolioId, stock) => {
        setModalContent(<UpdateStockModal portfolioId={portfolioId} stock={stock} />);
    };

    const handleDeletePortfolio = (portfolioId) => {
        setModalContent(<DeletePortfolioModal portfolioId={portfolioId} />);
    };

    const handleCreatePortfolio = () => {
        setModalContent(<PortfolioFormModal />);
    };

    const handleUpdatePortfolio = (portfolioId, currentName) => {
        setModalContent(<UpdatePortfolioModal portfolioId={portfolioId} currentName={currentName} />);
    };

    const calculatePortfolioMetrics = (portfolioId) => {
        const stocks = stocksByPortfolioId[portfolioId] || [];
        let currentValue = 0;
        let purchaseValue = 0;

        stocks.forEach(stock => {
            currentValue += stock.current_price * stock.quantity;
            purchaseValue += stock.purchase_price * stock.quantity;
        });

        const profitLoss = currentValue - purchaseValue;
        const profitLossPercentage = purchaseValue !== 0 ? ((profitLoss / purchaseValue) * 100).toFixed(2) : 0;

        return {
            currentValue: currentValue.toFixed(2),
            purchaseValue: purchaseValue.toFixed(2),
            profitLoss: profitLoss.toFixed(2),
            profitLossPercentage: profitLossPercentage
        };
    };

    return (
        <div className="portfolio-container">
            <div className="background-logo-compare"></div>
            <h1>Portfolios</h1>
            <h3>Limit 5 stocks per Portfolio</h3>
            <button className="create-portfolio-btn" onClick={handleCreatePortfolio}>Create Portfolio</button>
            <ul className="portfolio-list">
                {portfolios.map((portfolio) => {
                    const { currentValue, purchaseValue, profitLoss, profitLossPercentage } = calculatePortfolioMetrics(portfolio.id);
                    const hasStocks = stocksByPortfolioId[portfolio.id] && stocksByPortfolioId[portfolio.id].length > 0;

                    return (
                        <li key={portfolio.id} className="portfolio-item">
                            <h2>{portfolio.name}</h2>
                            {loading[portfolio.id] ? (
                                <div className="loading-container">
                                    <FaSpinner className="spinner" />
                                    <p>Loading...</p>
                                </div>
                            ) : (
                                <>
                                    {hasStocks && (
                                        <>
                                            <p>Current Value: ${currentValue}</p>
                                            <p>Purchase Value: ${purchaseValue}</p>
                                            <p>Profit/Loss: ${profitLoss} ({profitLossPercentage}%)</p>
                                        </>
                                    )}
                                    <div className="portfolio-buttons">
                                        <button onClick={() => handleUpdatePortfolio(portfolio.id, portfolio.name)}>Edit Portfolio</button>
                                        <button onClick={() => handleDeletePortfolio(portfolio.id)}>Delete Portfolio</button>
                                    </div>
                                    {hasStocks ? (
                                        <ul className="stocks-list">
                                            {stocksByPortfolioId[portfolio.id]?.map((stock) => (
                                                <li key={stock.id} className="stock-item">
                                                    {stock.stock_symbol} - Quantity: {stock.quantity}, Current Price: ${stock.current_price}, Purchase Price: ${stock.purchase_price}
                                                    <div className="stock-buttons">
                                                        <button onClick={() => toggleChartVisibility(portfolio.id, stock.stock_symbol)}>
                                                            {visibleCharts[`${portfolio.id}-${stock.stock_symbol}`] ? 'Hide Chart' : 'View Chart'}
                                                        </button>
                                                        <button onClick={() => handleUpdateStock(portfolio.id, stock)}>Edit Stock</button>
                                                        <button onClick={() => handleDeleteStock(portfolio.id, stock.id)}>Delete Stock</button>
                                                    </div>
                                                    {visibleCharts[`${portfolio.id}-${stock.stock_symbol}`] && (
                                                        <TradingViewMiniWidget
                                                            symbol={stock.stock_symbol}
                                                            containerId={`tradingview_widget_${portfolio.id}_${stock.stock_symbol}`}
                                                        />
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>Please add to portfolio</p>
                                    )}
                                </>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Portfolio;
