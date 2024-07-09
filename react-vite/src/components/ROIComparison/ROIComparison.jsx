import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoricalPrice } from '../../redux/stock_historical';
import './ROIComparison.css';

const RoiComparison = ({ symbolA, symbolB, onSetWinner }) => {
    const dispatch = useDispatch();
    const priceA = useSelector((state) => state.stockHistorical.historicalPrices[symbolA]);
    const priceB = useSelector((state) => state.stockHistorical.historicalPrices[symbolB]);
    const currentPriceA = useSelector((state) => state.stocks.stocks[symbolA]?.current_price);
    const currentPriceB = useSelector((state) => state.stocks.stocks[symbolB]?.current_price);

    useEffect(() => {
        if (symbolA) {
            dispatch(fetchHistoricalPrice(symbolA));
        }
        if (symbolB) {
            dispatch(fetchHistoricalPrice(symbolB));
        }
    }, [dispatch, symbolA, symbolB]);

    useEffect(() => {
        if (currentPriceA && currentPriceB && priceA && priceB) {
            const roiA = calculateROI(priceA, currentPriceA);
            const roiB = calculateROI(priceB, currentPriceB);
            onSetWinner(roiA > roiB ? symbolA : symbolB);
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
            <h2>ROI Comparison</h2>
            <div className={`roi-box ${roiA > roiB ? 'winner' : 'loser'}`}>
                {roiA > roiB && <div className="winning-badge">Winning Investment</div>}
                <h3>{symbolA}</h3>
                <p>Price 1 Year Ago: ${parseFloat(priceA?.close_price).toFixed(2)}</p>
                <p>Today's Price: ${currentPriceA}</p>
                <p>ROI: {roiA.toFixed(2)}%</p>
            </div>
            <div className={`roi-box ${roiB > roiA ? 'winner' : 'loser'}`}>
                {roiB > roiA && <div className="winning-badge">Winning Investment</div>}
                <h3>{symbolB}</h3>
                <p>Price 1 Year Ago: ${parseFloat(priceB?.close_price).toFixed(2)}</p>
                <p>Today's Price: ${currentPriceB}</p>
                <p>ROI: {roiB.toFixed(2)}%</p>
            </div>
            <h2>{roiA > roiB ? symbolA : symbolB} is the better investment.</h2>
        </div>
    );
};

export default RoiComparison;
