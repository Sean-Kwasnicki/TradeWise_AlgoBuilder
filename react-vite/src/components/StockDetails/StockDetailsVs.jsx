import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { fetchStock } from '../../redux/stock';
import { fetchHistoricalPrice } from '../../redux/stock_historical';
import StockDetailA from './StockDetailA';
import StockDetailB from './StockDetailB';
import RoiComparison from '../ROIComparison/ROIComparison';
import { getAllPortfoliosThunk, getPortfolioStocksThunk } from '../../redux/portfolio';
import { getAllWatchlistsThunk, getWatchlistStocksThunk } from '../../redux/watchlist';
import './StockDetailsVs.css';

const StockDetailsVs = () => {
    const [inputSymbolA, setInputSymbolA] = useState('');
    const [inputSymbolB, setInputSymbolB] = useState('');
    const [symbolA, setSymbolA] = useState('');
    const [symbolB, setSymbolB] = useState('');
    const [showComparison, setShowComparison] = useState(false);
    const [winner, setWinner] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [compareDisabled, setCompareDisabled] = useState(false);
    const [stockCount, setStockCount] = useState(0);

    const dispatch = useDispatch();
    const portfolios = useSelector((state) => state.portfolio.portfolios);
    const stocksByPortfolioId = useSelector((state) => state.portfolio.stocksByPortfolioId);
    const watchlists = useSelector((state) => state.watchlist.watchlists);
    const stocksByWatchlistId = useSelector((state) => state.watchlist.stocksByWatchlistId);

    const addedStocksPort = new Set();
    const addedStocksWL = new Set();

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            await dispatch(getAllPortfoliosThunk());
            await dispatch(getAllWatchlistsThunk());
            setLoading(false);
        };

        fetchInitialData();
    }, [dispatch]);

    useEffect(() => {
        if (portfolios.length > 0) {
            portfolios.forEach(portfolio => {
                dispatch(getPortfolioStocksThunk(portfolio.id));
            });
        }
    }, [dispatch, portfolios]);

    useEffect(() => {
        if (watchlists.length > 0) {
            watchlists.forEach(watchlist => {
                dispatch(getWatchlistStocksThunk(watchlist.id));
            });
        }
    }, [dispatch, watchlists]);

    useEffect(() => {
        if (stocksByPortfolioId) {
            let initialStockCount = 0;
            for (const stocks of Object.values(stocksByPortfolioId)) {
                initialStockCount += stocks.length;
                stocks.forEach(stock => addedStocksPort.add(stock.symbol));
            }
            setStockCount(initialStockCount);
        }
    }, [stocksByPortfolioId]);

    useEffect(() => {
        if (stocksByWatchlistId) {
            for (const stocks of Object.values(stocksByWatchlistId)) {
                stocks.forEach(stock => addedStocksWL.add(stock.symbol));
            }
        }
    }, [stocksByWatchlistId]);

    const handleInputChangeA = (e) => {
        setInputSymbolA(e.target.value.toUpperCase().trim());
    };

    const handleInputChangeB = (e) => {
        setInputSymbolB(e.target.value.toUpperCase().trim());
    };

    const handleFetchDetails = async () => {
        if (inputSymbolA === inputSymbolB) {
            setError('The symbols cannot be the same. Please enter different symbols.');
            return;
        }

        if (inputSymbolA && inputSymbolA.trim() && inputSymbolB && inputSymbolB.trim()) {
            setLoading(true);
            setError(null);
            setDataFetched(false);
            setCompareDisabled(true);
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            const formattedDate = oneYearAgo.toISOString().split('T')[0];

            try {
                const stockPromiseA = dispatch(fetchStock(inputSymbolA));
                const stockPromiseB = dispatch(fetchStock(inputSymbolB));
                const historicalPricePromiseA = dispatch(fetchHistoricalPrice(inputSymbolA, formattedDate));
                const historicalPricePromiseB = dispatch(fetchHistoricalPrice(inputSymbolB, formattedDate));

                await Promise.all([stockPromiseA, stockPromiseB, historicalPricePromiseA, historicalPricePromiseB]);

                if (stockPromiseA && stockPromiseB) {
                    setSymbolA(inputSymbolA);
                    setSymbolB(inputSymbolB);
                    setShowComparison(true);
                } else {
                    throw new Error('Invalid symbol');
                }
            } catch (err) {
                setError('Invalid symbol');
                setShowComparison(false);
            } finally {
                setLoading(false);
                setDataFetched(true);
            }
        } else {
            setError('One or both of the symbols are invalid, please try again');
            setDataFetched(true);
        }
    };

    const handleCompare = () => {
        handleFetchDetails();
    };

    const handleReset = () => {
        setInputSymbolA('');
        setInputSymbolB('');
        setSymbolA('');
        setSymbolB('');
        setShowComparison(false);
        setWinner('');
        setLoading(false);
        setError(null);
        setDataFetched(false);
        setCompareDisabled(false);
    };

    const handleSetWinner = (winnerSymbol) => {
        setWinner(winnerSymbol);
    };

    return (
        <div className="stock-details-vs">
            <div className="background-logo-compare"></div>
            <h1>Compare Stocks</h1>
            <input
                type="text"
                value={inputSymbolA}
                onChange={handleInputChangeA}
                placeholder="Enter first stock symbol"
                disabled={showComparison}
            />
            <input
                type="text"
                value={inputSymbolB}
                onChange={handleInputChangeB}
                placeholder="Enter second stock symbol"
                disabled={showComparison}
            />
            <button className="button" onClick={handleCompare} disabled={compareDisabled}>Compare</button>
            <button className="button reset-button" onClick={handleReset}>Reset</button>
            {loading ? (
                <div className="loading-section">
                    <FaSpinner className="spinner" />
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        showComparison && (
                            <div className="comparison-container">
                                <div className="stock-detail-wrapper">
                                    <StockDetailA
                                        symbol={symbolA}
                                        detailType="A"
                                        portfolios={portfolios}
                                        stocksByPortfolioId={stocksByPortfolioId}
                                        watchlists={watchlists}
                                        stocksByWatchlistId={stocksByWatchlistId}
                                        addedStocksPort={addedStocksPort}
                                        addedStocksWL={addedStocksWL}
                                        stockCount={stockCount}
                                        setStockCount={setStockCount}
                                    />
                                    <div className="vs-divider">VS</div>
                                    <StockDetailB
                                        symbol={symbolB}
                                        detailType="B"
                                        portfolios={portfolios}
                                        stocksByPortfolioId={stocksByPortfolioId}
                                        watchlists={watchlists}
                                        stocksByWatchlistId={stocksByWatchlistId}
                                        addedStocksPort={addedStocksPort}
                                        addedStocksWL={addedStocksWL}
                                        stockCount={stockCount}
                                        setStockCount={setStockCount}
                                    />
                                </div>
                                <div className="roi-comparison">
                                    <RoiComparison symbolA={symbolA} symbolB={symbolB} onSetWinner={handleSetWinner} />
                                </div>
                            </div>
                        )
                    )}
                </>
            )}
        </div>
    );
};

export default StockDetailsVs;
