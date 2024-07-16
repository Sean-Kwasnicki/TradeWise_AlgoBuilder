import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoricalPrice } from '../../redux/stock_historical';
import { FaSpinner } from 'react-icons/fa';
import './ROIComparison.css';

const RoiComparison = ({ symbolA, symbolB, onSetWinner }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [winnerChosen, setWinnerChosen] = useState(false);

    const dispatch = useDispatch();
    const priceA = useSelector((state) => state.stockHistorical.historicalPrices[symbolA]);
    const priceB = useSelector((state) => state.stockHistorical.historicalPrices[symbolB]);
    const currentPriceA = useSelector((state) => state.stocks.stocks[symbolA]?.current_price);
    const currentPriceB = useSelector((state) => state.stocks.stocks[symbolB]?.current_price);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setDataFetched(false);
            setWinnerChosen(false);

            try {
                const fetchPriceAPromise = dispatch(fetchHistoricalPrice(symbolA));
                const fetchPriceBPromise = dispatch(fetchHistoricalPrice(symbolB));

                await Promise.all([fetchPriceAPromise, fetchPriceBPromise]);

                setDataFetched(true);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        if (symbolA && symbolB) {
            fetchData();
        }
    }, [dispatch, symbolA, symbolB]);

    useEffect(() => {
        if (currentPriceA && currentPriceB && priceA && priceB) {
            const roiA = calculateROI(priceA, currentPriceA);
            const roiB = calculateROI(priceB, currentPriceB);
            onSetWinner(roiA > roiB ? symbolA : symbolB);
            setWinnerChosen(true);
        }
    }, [currentPriceA, currentPriceB, priceA, priceB, onSetWinner, symbolA, symbolB]);

    const calculateROI = (historicalPrice, currentPrice) => {
        if (historicalPrice && currentPrice) {
            const startPrice = parseFloat(historicalPrice.close_price).toFixed(2);
            const endPrice = currentPrice;
            return ((endPrice - startPrice) / startPrice) * 100;
        }
        return 0;
    };

    const roiA = calculateROI(priceA, currentPriceA);
    const roiB = calculateROI(priceB, currentPriceB);

    return (
        <div className="roi-comparison">
            {loading ? (
                <div className="loading">
                    <FaSpinner className="spinner" />
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        <>
                            {winnerChosen && dataFetched && (
                                <>
                                    <h2>ROI Comparison</h2>
                                    <div className={`roi-box ${roiA > roiB ? 'winner' : 'loser'}`}>
                                        {roiA > roiB && <div className="winning-badge">Winning Investment</div>}
                                        <h3>{symbolA}</h3>
                                        <p>Price 1 Year Ago: ${parseFloat(priceA?.close_price).toFixed(2)}</p>
                                        <p>Today's Price: ${currentPriceA}</p>
                                        <p>ROI: {roiA.toFixed(2)}%</p>
                                    </div>
                                    <div className="vs-divider">VS</div>
                                    <div className={`roi-box ${roiB > roiA ? 'winner' : 'loser'}`}>
                                        {roiB > roiA && <div className="winning-badge">Winning Investment</div>}
                                        <h3>{symbolB}</h3>
                                        <p>Price 1 Year Ago: ${parseFloat(priceB?.close_price).toFixed(2)}</p>
                                        <p>Today's Price: ${currentPriceB}</p>
                                        <p>ROI: {roiB.toFixed(2)}%</p>
                                    </div>
                                    <h2>{roiA > roiB ? symbolA : symbolB} is the better investment.</h2>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default RoiComparison;
