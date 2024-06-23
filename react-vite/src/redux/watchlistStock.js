// Action Types
const LOAD_WATCHLIST_STOCKS = 'watchlistStocks/LOAD_WATCHLIST_STOCKS';
const ADD_WATCHLIST_STOCK = 'watchlistStocks/ADD_WATCHLIST_STOCK';
const UPDATE_WATCHLIST_STOCK = 'watchlistStocks/UPDATE_WATCHLIST_STOCK';
const DELETE_WATCHLIST_STOCK = 'watchlistStocks/DELETE_WATCHLIST_STOCK';
const FETCH_WATCHLIST_STOCKS_SUCCESS = 'watchlistStocks/FETCH_WATCHLIST_STOCKS_SUCCESS';
const UPDATE_WATCHLIST_STOCK_PRICE = 'watchlistStocks/UPDATE_WATCHLIST_STOCK_PRICE';

// Action Creators
const loadWatchlistStocks = (stocks) => ({
  type: LOAD_WATCHLIST_STOCKS,
  stocks,
});

const addWatchlistStock = (stock) => ({
  type: ADD_WATCHLIST_STOCK,
  stock,
});

const updateWatchlistStock = (stock) => ({
  type: UPDATE_WATCHLIST_STOCK,
  stock,
});

const deleteWatchlistStock = (stockId) => ({
  type: DELETE_WATCHLIST_STOCK,
  stockId,
});

const fetchWatchlistStocksSuccess = (stocks) => ({
  type: FETCH_WATCHLIST_STOCKS_SUCCESS,
  payload: stocks,
});

const updateWatchlistStockPrice = (symbol, price) => ({
  type: UPDATE_WATCHLIST_STOCK_PRICE,
  payload: { symbol, price },
});

// Thunks
export const fetchWatchlistStocks = () => async (dispatch) => {
  const response = await fetch('/api/watchlist-stocks');
  if (response.ok) {
    const stocks = await response.json();
    dispatch(loadWatchlistStocks(stocks));
  }
};

export const createWatchlistStock = (stock) => async (dispatch) => {
  const response = await fetch('/api/watchlist-stocks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stock),
  });
  if (response.ok) {
    const newStock = await response.json();
    dispatch(addWatchlistStock(newStock));
  }
};

export const updateWatchlistStockThunk = (stock) => async (dispatch) => {
  const response = await fetch(`/api/watchlist-stocks/${stock.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stock),
  });
  if (response.ok) {
    const updatedStock = await response.json();
    dispatch(updateWatchlistStock(updatedStock));
  }
};

export const deleteWatchlistStockThunk = (stockId) => async (dispatch) => {
  const response = await fetch(`/api/watchlist-stocks/${stockId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteWatchlistStock(stockId));
  }
};

export const fetchInitialData = () => async (dispatch) => {
  const API_KEY = 'c8hkl2qad3id01y88q4g';
  const symbols = ['AAPL', 'GOOGL', 'MSFT']; // Example symbols, replace with your watchlist symbols

  const fetchStockDetails = async (symbol) => {
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`Error fetching stock details: ${response.statusText}`);
    }
    return response.json();
  };

  try {
    const stocks = await Promise.all(symbols.map(symbol => fetchStockDetails(symbol).then(data => ({ symbol, ...data }))));
    dispatch(fetchWatchlistStocksSuccess(stocks));
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }
};

// Initial State
const initialState = {};

// Reducer
const watchlistStockReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_WATCHLIST_STOCKS:
      const newStocks = {};
      action.stocks.forEach((stock) => {
        newStocks[stock.id] = stock;
      });
      return { ...state, ...newStocks };
    case ADD_WATCHLIST_STOCK:
      return { ...state, [action.stock.id]: action.stock };
    case UPDATE_WATCHLIST_STOCK:
      return { ...state, [action.stock.id]: action.stock };
    case DELETE_WATCHLIST_STOCK:
        const newState = { ...state };
        delete newState[action.stockId];
        return newState;
    case FETCH_WATCHLIST_STOCKS_SUCCESS:
        return {
          ...state,
          stocks: action.payload,
        };
    case UPDATE_WATCHLIST_STOCK_PRICE:
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
  
  export default watchlistStockReducer;
  
