import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllPortfoliosThunk,
    getPortfolioStocksThunk,
    createPortfolioThunk,
    deletePortfolioThunk,
    updatePortfolioThunk,
    deletePortfolioStockThunk,
    updatePortfolioStockThunk
} from '../../redux/portfolio';
import { useModal } from '../../context/Modal';
import TradingViewMiniWidget from '../SmartChart/TradingViewMiniWidget';
import { FaSpinner } from 'react-icons/fa';
import PortfolioFormModal from './PortfolioFormModal';
import DeletePortfolioModal from './DeletePortfolioModal';
import UpdatePortfolioModal from './UpdatePortfolioModal';
import UpdateStockModal from './UpdateStockModal';
import DeleteStockModal from './DeleteStockModal';
import './Portfolios.css'

const Portfolio = () => {
    const dispatch = useDispatch();
    const portfolios = useSelector((state) => state.portfolio.portfolios);
    const stocksByPortfolioId = useSelector((state) => state.portfolio.stocksByPortfolioId);
    const [loading, setLoading] = useState({});
    const [visiblePortfolios, setVisiblePortfolios] = useState({});
    const { setModalContent } = useModal();

    useEffect(() => {
        dispatch(getAllPortfoliosThunk());
    }, [dispatch]);

    // const handleCreatePortfolio = () => {
    //     const name = prompt('Enter portfolio name:');
    //     // const initialBalance = prompt('Enter initial balance:');
    //     dispatch(createPortfolioThunk({ name }));
    // };

    const handleCreatePortfolio = () => {
        setModalContent(<PortfolioFormModal />);
    };

    // const handleUpdatePortfolio = (id) => {
    //     const name = prompt('Enter new portfolio name:');
    //     if (name) {
    //         dispatch(updatePortfolioThunk(id, { name }));
    //     }
    // };

    const handleUpdatePortfolio = (id, currentName) => {
        setModalContent(<UpdatePortfolioModal portfolioId={id} currentName={currentName} />);
    };


    // const handleDeletePortfolio = (id) => {
    //     const confirmDelete = window.confirm('Are you sure you want to delete this portfolio?');
    //     if (confirmDelete) {
    //         dispatch(deletePortfolioThunk(id));
    //     }
    // };

    const handleDeletePortfolio = (id) => {
        setModalContent(<DeletePortfolioModal portfolioId={id}/>);
    };

    const handleViewPortfolio = (portfolioId) => {
        if (visiblePortfolios[portfolioId]) {
            setVisiblePortfolios((prev) => ({ ...prev, [portfolioId]: false }));
        } else {
            setLoading((prev) => ({ ...prev, [portfolioId]: true }));
            dispatch(getPortfolioStocksThunk(portfolioId)).then(() => {
                setLoading((prev) => ({ ...prev, [portfolioId]: false }));
                setVisiblePortfolios((prev) => ({ ...prev, [portfolioId]: true }));
            });
        }
    };

    const toggleChartVisibility = (portfolioId, stockSymbol) => {
        setVisiblePortfolios((prev) => ({
            ...prev,
            [`${portfolioId}-${stockSymbol}`]: !prev[`${portfolioId}-${stockSymbol}`]
        }));
    };

    // const handleDeleteStock = (portfolioId, stockId) => {
    //     dispatch(deletePortfolioStockThunk(portfolioId, stockId)).then(() => {
    //         dispatch(getPortfolioStocksThunk(portfolioId));
    //     });
    // };

    const handleDeleteStock = (portfolioId, stockId) => {
        setModalContent(<DeleteStockModal portfolioId={portfolioId} stockId={stockId} />);
    };
    // const handleUpdateStock = (portfolioId, stock) => {
    //     const quantity = prompt('Enter new quantity:', stock.quantity);
    //     if (quantity && quantity !== stock.quantity) {
    //         dispatch(updatePortfolioStockThunk(portfolioId, stock.id, {
    //             quantity: parseFloat(quantity),
    //             purchase_price: stock.purchase_price,
    //             current_price: stock.current_price
    //         })).then(() => {
    //             dispatch(getPortfolioStocksThunk(portfolioId));
    //         });
    //     }
    // };

    const handleUpdateStock = (portfolioId, stock) => {
        setModalContent(<UpdateStockModal portfolioId={portfolioId} stock={stock} />);
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
            <div className="background-logo"></div>
            <h1>Portfolios</h1>
            <button className="create-portfolio-btn" onClick={handleCreatePortfolio}>Create Portfolio</button>
            <ul className="portfolio-list">
                {portfolios.map((portfolio) => {
                    const { currentValue, purchaseValue, profitLoss, profitLossPercentage } = calculatePortfolioMetrics(portfolio.id);
                    return (
                        <li key={portfolio.id} className="portfolio-item">
                            <h2>{portfolio.name}</h2>
                            {visiblePortfolios[portfolio.id] && (
                                <>
                                    <p>Current Value: ${currentValue}</p>
                                    <p>Purchase Value: ${purchaseValue}</p>
                                    <p>Profit/Loss: ${profitLoss} ({profitLossPercentage}%)</p>
                                </>
                            )}
                            <div className="portfolio-buttons">
                                <button onClick={() => handleUpdatePortfolio(portfolio.id)}>Edit</button>
                                <button onClick={() => handleDeletePortfolio(portfolio.id)}>Delete</button>
                                <button onClick={() => handleViewPortfolio(portfolio.id)}>
                                    {visiblePortfolios[portfolio.id] ? 'Hide Portfolio' : 'View Portfolio'}
                                </button>
                            </div>
                            {loading[portfolio.id] ? (
                                <div className="loading-container">
                                    <FaSpinner className="spinner" />
                                    <p>Loading...</p>
                                </div>
                            ) : (
                                visiblePortfolios[portfolio.id] && (
                                    <ul className="stocks-list">
                                        {stocksByPortfolioId[portfolio.id]?.map((stock) => (
                                            <li key={stock.id} className="stock-item">
                                                {stock.stock_symbol} - Quantity: {stock.quantity}, Current Price: ${stock.current_price}, Purchase Price: ${stock.purchase_price}
                                                <div className="stock-buttons">
                                                    <button onClick={() => handleUpdateStock(portfolio.id, stock)}>Edit Stock</button>
                                                    <button onClick={() => handleDeleteStock(portfolio.id, stock.id)}>Delete Stock</button>
                                                    <button onClick={() => toggleChartVisibility(portfolio.id, stock.stock_symbol)}>
                                                        {visiblePortfolios[`${portfolio.id}-${stock.stock_symbol}`] ? 'Hide Chart' : 'View Chart'}
                                                    </button>
                                                </div>
                                                {visiblePortfolios[`${portfolio.id}-${stock.stock_symbol}`] && (
                                                    <TradingViewMiniWidget
                                                        symbol={stock.stock_symbol}
                                                        containerId={`tradingview_widget_${portfolio.id}_${stock.stock_symbol}`}
                                                    />
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Portfolio;
