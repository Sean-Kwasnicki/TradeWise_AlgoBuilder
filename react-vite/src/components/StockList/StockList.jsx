import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeToStock, unsubscribeFromStock, fetchInitialData } from '../../redux/stock';

const StockList = ({ symbols, listType }) => {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(fetchInitialData());

    symbols.forEach((symbol) => {
      dispatch(subscribeToStock(symbol));
    });

    return () => {
      symbols.forEach((symbol) => {
        dispatch(unsubscribeFromStock(symbol));
      });
    };
  }, [dispatch, symbols]);

  return (
    <div>
      <h2>{listType === 'portfolio' ? 'Portfolio Stocks' : 'Watchlist Stocks'}</h2>
      {symbols.map((symbol) => (
        <div key={symbol}>
          <h3>{symbol}</h3>
          <p>Price: {stocks[symbol]?.price}</p>
        </div>
      ))}
    </div>
  );
};

export default StockList;
