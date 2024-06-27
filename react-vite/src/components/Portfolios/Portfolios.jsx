import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllPortfoliosThunk,
    getPortfolioStocksThunk,
    createPortfolioThunk,
    deletePortfolioThunk,
    updatePortfolioThunk
} from '../../redux/portfolio';

const Portfolio = () => {
    const dispatch = useDispatch();
    const portfolios = useSelector((state) => state.portfolio.portfolios);
    const stocksByPortfolioId = useSelector((state) => state.portfolio.stocksByPortfolioId);

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
        const initialBalance = prompt('Enter new initial balance:');
        const currentValue = prompt('Enter current value:');
        const profitLoss = prompt('Enter profit/loss:');
        dispatch(updatePortfolioThunk(id, { name, initial_balance: initialBalance, current_value: currentValue, profit_loss: profitLoss }));
    };

    const handleDeletePortfolio = (id) => {
        dispatch(deletePortfolioThunk(id));
    };

    const handleViewStocks = (portfolioId) => {
        dispatch(getPortfolioStocksThunk(portfolioId));
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
                        <button onClick={() => handleViewStocks(portfolio.id)}>View Stocks</button>
                        {stocksByPortfolioId[portfolio.id] && Array.isArray(stocksByPortfolioId[portfolio.id]) && (
                            <ul>
                                {stocksByPortfolioId[portfolio.id].map((stock) => (
                                    <li key={stock.id}>
                                        {stock.stock_symbol} - Quantity: {stock.quantity}, Current Price: ${stock.current_price}, Purchase Price: ${stock.purchase_price}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Portfolio;
