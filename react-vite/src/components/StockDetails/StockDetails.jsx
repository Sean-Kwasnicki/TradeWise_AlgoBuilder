import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStock } from '../../redux/stock';
import { addPortfolioStockThunk, getAllPortfoliosThunk } from '../../redux/portfolio';
import { addWatchlistStockThunk, getAllWatchlistsThunk } from '../../redux/watchlist';
import { FaSpinner } from 'react-icons/fa';
import TradingViewWidget from '../SmartChart/TradingViewWidget';
import './StockDetails.css';

const StockDetails = () => {
    const [symbol, setSymbol] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const stock = useSelector((state) => state.stocks.stocks && state.stocks.stocks[symbol]);
    const portfolios = useSelector((state) => state.portfolio.portfolios);
    const watchlists = useSelector((state) => state.watchlist.watchlists);

    useEffect(() => {
        dispatch(getAllPortfoliosThunk());
        dispatch(getAllWatchlistsThunk());
    }, [dispatch]);

    const handleInputChange = (e) => {
        setSymbol(e.target.value.toUpperCase());
    };

    const handleFetchDetails = async () => {
        if (symbol) {
            setLoading(true);
            await dispatch(fetchStock(symbol));
            setLoading(false);
            console.log('Fetched stock:', stock);
        }
    };

    useEffect(() => {
        console.log('Current stock state:', stock);
    }, [stock])

    const handleAddToPortfolio = async () => {
        const quantity = prompt('Enter quantity:');
        const purchasePrice = prompt('Enter purchase price:');
        if (quantity && purchasePrice) {
            const portfolioName = prompt('Enter portfolio name:');
            const portfolio = portfolios.find(p => p.name === portfolioName);
            if (portfolio) {
                const result = await dispatch(addPortfolioStockThunk(portfolio.id, {
                    stock_symbol: symbol,
                    quantity: parseFloat(quantity),
                    purchase_price: parseFloat(purchasePrice)
                }));
                if (result.error) {
                    alert('Failed to add stock to portfolio: ' + result.error);
                }
            } else {
                alert('Portfolio not found');
            }
        }
    };

    // const handleAddToWatchlist = async () => {
    //     const watchlistName = prompt('Enter watchlist name:');
    //     const watchlist = watchlists.find(w => w.name === watchlistName);
    //     if (watchlist) {
    //         const result = await dispatch(addWatchlistStockThunk(watchlist.id, {
    //             stock_symbol: symbol,
    //             current_price: stock.current_price
    //         }));
    //         if (result.error) {
    //             alert('Failed to add stock to watchlist: ' + result.error);
    //         }
    //     } else {
    //         alert('Watchlist not found');
    //     }
    // };

    const handleAddToWatchlist = () => {
      const watchlistName = prompt('Enter watchlist name:');
      const watchlist = watchlists.find(w => w.name === watchlistName);
      if (watchlist) {
          dispatch(addWatchlistStockThunk(watchlist.id, {
              stock_symbol: symbol,
              current_price: stock.current_price,
            //   added_price: stock.current_price
          }));
      } else {
          alert('Watchlist not found');
      }
  };

    return (
        <div>
            <h1>Stock Details</h1>
            <input
                type="text"
                value={symbol}
                onChange={handleInputChange}
                placeholder="Enter stock symbol"
            />
            <button onClick={handleFetchDetails}>Get Stock Details</button>
            {loading ? (
                <div>
                    <FaSpinner className="spinner" />
                    <p>Loading...</p>
                </div>
            ) : stock ? (
                <div>
                    <h2>Stock Details for {stock.name}: {stock.symbol}</h2>
                    <p>Current Price: ${stock.current_price}</p>
                    <p>Market Cap: ${stock.market_cap}</p>
                    <p>PE Ratio: {stock.pe_ratio}</p>
                    <p>Dividend Yield: {stock.dividend_yield}</p>
                    {/* <p>Volume: {stock.volume}</p> */}
                    <p>52 Week High: ${stock.week_52_high}</p>
                    <p>52 Week Low: ${stock.week_52_low}</p>
                    {/* <p>Average Volume: {stock.average_volume}</p> */}
                    <button onClick={handleAddToPortfolio}>Add to Portfolio</button>
                    <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
                    <TradingViewWidget symbol={stock.symbol} />
                </div>
            ) : (
                <p>No stock details available. Enter a symbol and fetch the details.</p>
            )}
        </div>
    );
};

export default StockDetails;
