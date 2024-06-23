import { subscribe, unsubscribe } from '../api/finnhubWebSocketClient';

// Action Types
const LOAD_STOCKS = 'stocks/LOAD_STOCKS';
const ADD_STOCK = 'stocks/ADD_STOCK';
const UPDATE_STOCK = 'stocks/UPDATE_STOCK';
const DELETE_STOCK = 'stocks/DELETE_STOCK';
const FETCH_STOCKS_SUCCESS = 'stocks/FETCH_STOCKS_SUCCESS';
const UPDATE_STOCK_PRICE = 'stocks/UPDATE_STOCK_PRICE';

// Action Creators
const loadStocks = (stocks) => ({
  type: LOAD_STOCKS,
  stocks,
});

const addStock = (stock) => ({
  type: ADD_STOCK,
  stock,
});

const updateStock = (stock) => ({
  type: UPDATE_STOCK,
  stock,
});

const deleteStock = (stockId) => ({
  type: DELETE_STOCK,
  stockId,
});

const fetchStocksSuccess = (stocks) => ({
  type: FETCH_STOCKS_SUCCESS,
  payload: stocks,
});

const updateStockPrice = (symbol, price) => ({
  type: UPDATE_STOCK_PRICE,
  payload: { symbol, price },
});

// Thunks
export const fetchStocks = () => async (dispatch) => {
  const response = await fetch('/api/stocks');
  if (response.ok) {
    const stocks = await response.json();
    dispatch(loadStocks(stocks));
  }
};

export const createStock = (stock) => async (dispatch) => {
  const response = await fetch('/api/stocks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stock),
  });
  if (response.ok) {
    const newStock = await response.json();
    dispatch(addStock(newStock));
  }
};

export const updateStockThunk = (stock) => async (dispatch) => {
  const response = await fetch(`/api/stocks/${stock.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stock),
  });
  if (response.ok) {
    const updatedStock = await response.json();
    dispatch(updateStock(updatedStock));
  }
};

export const deleteStockThunk = (stockId) => async (dispatch) => {
  const response = await fetch(`/api/stocks/${stockId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteStock(stockId));
  }
};

export const fetchInitialData = () => async (dispatch) => {
  const API_KEY = 'clt3pdhr01qhnjgr4v0gclt3pdhr01qhnjgr4v10';
  const symbols = ['AAPL', 'GOOGL', 'MSFT']; // Example symbols, replace with your portfolio symbols

  const fetchStockDetails = async (symbol) => {
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`Error fetching stock details: ${response.statusText}`);
    }
    return response.json();
  };

  try {
    const stocks = await Promise.all(symbols.map(symbol => fetchStockDetails(symbol).then(data => ({ symbol, ...data }))));
    dispatch(fetchStocksSuccess(stocks));
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }
};

export const subscribeToStock = (symbol) => (dispatch) => {
  subscribe(symbol, (price) => {
    dispatch(updateStockPrice(symbol, price));
  });
};

export const unsubscribeFromStock = (symbol) => () => {
  unsubscribe(symbol);
};

// Initial State
const initialState = {};

// Reducer
const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STOCKS:
      const newStocks = {};
      action.stocks.forEach((stock) => {
        newStocks[stock.id] = stock;
      });
      return { ...state, ...newStocks };
    case ADD_STOCK:
      return { ...state, [action.stock.id]: action.stock };
    case UPDATE_STOCK:
      return { ...state, [action.stock.id]: action.stock };
    case DELETE_STOCK:
      const newState = { ...state };
      delete newState[action.stockId];
      return newState;
    case FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        stocks: action.payload,
      };
    case UPDATE_STOCK_PRICE:
      return {
        ...state,
        stocks: state.stocks.map(stock =>
          stock.symbol === action.payload.symbol
            ? { ...stock, price: action.payload.price }
            : stock
        ),
      };
    default:
      return state;
  }
};

export default stockReducer;
