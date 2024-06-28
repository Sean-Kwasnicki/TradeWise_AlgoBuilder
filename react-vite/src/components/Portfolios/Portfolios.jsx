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
import TradingViewMiniWidget from '../SmartChart/TradingViewMiniWidget';
import { FaSpinner } from 'react-icons/fa';

const Portfolio = () => {
    const dispatch = useDispatch();
    const portfolios = useSelector((state) => state.portfolio.portfolios);
    const stocksByPortfolioId = useSelector((state) => state.portfolio.stocksByPortfolioId);
    const [loading, setLoading] = useState({});
    const [visibleStocks, setVisibleStocks] = useState({});
    const [visibleCharts, setVisibleCharts] = useState({});

    useEffect(() => {
        dispatch(getAllPortfoliosThunk());
    }, [dispatch]);

    const handleCreatePortfolio = () => {
        const name = prompt('Enter portfolio name:');
        const initialBalance = prompt('Enter initial balance:');
        dispatch(createPortfolioThunk({ name, initial_balance: initialBalance }));
    };

    const handleUpdatePortfolio = (id) => {
        const name = prompt('Enter new portfolio name:');
        if (name) {
            dispatch(updatePortfolioThunk(id, { name }));
        }
    };

    const handleDeletePortfolio = (id) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this portfolio?');
      if(confirmDelete){
        dispatch(deletePortfolioThunk(id));
      }
    };

    const handleViewStocks = (portfolioId) => {
        if (visibleStocks[portfolioId]) {
            setVisibleStocks((prev) => ({ ...prev, [portfolioId]: false }));
        } else {
            setLoading((prev) => ({ ...prev, [portfolioId]: true }));
            dispatch(getPortfolioStocksThunk(portfolioId)).then(() => {
                setLoading((prev) => ({ ...prev, [portfolioId]: false }));
                setVisibleStocks((prev) => ({ ...prev, [portfolioId]: true }));
            });
        }
    };

    const toggleChartVisibility = (portfolioId, stockSymbol) => {
        setVisibleCharts((prev) => ({
            ...prev,
            [`${portfolioId}-${stockSymbol}`]: !prev[`${portfolioId}-${stockSymbol}`]
        }));
    };

    const handleDeleteStock = (portfolioId, stockId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this stock?');
        if (confirmDelete) {
            dispatch(deletePortfolioStockThunk(portfolioId, stockId));
        }
    };

    const handleUpdateStock = (portfolioId, stock) => {
        const quantity = prompt('Enter new quantity:', stock.quantity);
        if (quantity && quantity !== stock.quantity) {
            dispatch(updatePortfolioStockThunk(portfolioId, stock.id, {
                quantity: parseFloat(quantity),
                purchase_price: stock.purchase_price,
                current_price: stock.current_price
            }));
        }
    };

    return (
        <div>
            <h1>Portfolios</h1>
            <button onClick={handleCreatePortfolio}>Create Portfolio</button>
            <ul>
                {portfolios.map((portfolio) => (
                    <li key={portfolio.id}>
                        <h2>{portfolio.name}</h2>
                        <p>Initial Balance: ${portfolio.initial_balance}</p>
                        <p>Current Value: ${portfolio.current_value}</p>
                        <p>Profit/Loss: ${portfolio.profit_loss}</p>
                        <button onClick={() => handleUpdatePortfolio(portfolio.id)}>Edit</button>
                        <button onClick={() => handleDeletePortfolio(portfolio.id)}>Delete</button>
                        <button onClick={() => handleViewStocks(portfolio.id)}>
                            {visibleStocks[portfolio.id] ? 'Hide Stocks' : 'View Stocks'}
                        </button>
                        {loading[portfolio.id] ? (
                            <div>
                                <FaSpinner className="spinner" />
                                <p>Loading...</p>
                            </div>
                        ) : (
                            visibleStocks[portfolio.id] && (
                                <ul>
                                    {stocksByPortfolioId[portfolio.id]?.map((stock) => (
                                        <li key={stock.id}>
                                            {stock.stock_symbol} - Quantity: {stock.quantity}, Current Price: ${stock.current_price}, Purchase Price: ${stock.purchase_price}
                                            <button onClick={() => handleUpdateStock(portfolio.id, stock)}>Edit Stock</button>
                                            <button onClick={() => handleDeleteStock(portfolio.id, stock.id)}>Delete Stock</button>
                                            <button onClick={() => toggleChartVisibility(portfolio.id, stock.stock_symbol)}>
                                                {visibleCharts[`${portfolio.id}-${stock.stock_symbol}`] ? 'Hide Chart' : 'View Chart'}
                                            </button>
                                            {visibleCharts[`${portfolio.id}-${stock.stock_symbol}`] && (
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
                ))}
            </ul>
        </div>
    );
};

export default Portfolio;
