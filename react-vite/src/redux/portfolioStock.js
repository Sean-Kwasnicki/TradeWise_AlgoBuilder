// Action Types
const LOAD_PORTFOLIO_STOCKS = 'portfolioStocks/LOAD_PORTFOLIO_STOCKS';
const ADD_PORTFOLIO_STOCK = 'portfolioStocks/ADD_PORTFOLIO_STOCK';
const UPDATE_PORTFOLIO_STOCK = 'portfolioStocks/UPDATE_PORTFOLIO_STOCK';
const DELETE_PORTFOLIO_STOCK = 'portfolioStocks/DELETE_PORTFOLIO_STOCK';
const FETCH_PORTFOLIO_STOCKS_SUCCESS = 'portfolioStocks/FETCH_PORTFOLIO_STOCKS_SUCCESS';
const UPDATE_PORTFOLIO_STOCK_PRICE = 'portfolioStocks/UPDATE_PORTFOLIO_STOCK_PRICE';

// Action Creators
const loadPortfolioStocks = (stocks) => ({
  type: LOAD_PORTFOLIO_STOCKS,
  stocks,
});

const addPortfolioStock = (stock) => ({
  type: ADD_PORTFOLIO_STOCK,
  stock,
});

const updatePortfolioStock = (stock) => ({
  type: UPDATE_PORTFOLIO_STOCK,
  stock,
});

const deletePortfolioStock = (stockId) => ({
  type: DELETE_PORTFOLIO_STOCK,
  stockId,
});

const fetchPortfolioStocksSuccess = (stocks) => ({
  type: FETCH_PORTFOLIO_STOCKS_SUCCESS,
  payload: stocks,
});

const updatePortfolioStockPrice = (symbol, price) => ({
  type: UPDATE_PORTFOLIO_STOCK_PRICE,
  payload: { symbol, price },
});

// Thunks
export const fetchPortfolioStocks = () => async (dispatch) => {
  const response = await fetch('/api/portfolio-stocks');
  if (response.ok) {
    const stocks = await response.json();
    dispatch(loadPortfolioStocks(stocks));
  }
};

export const createPortfolioStock = (stock) => async (dispatch) => {
  const response = await fetch('/api/portfolio-stocks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stock),
  });
  if (response.ok) {
    const newStock = await response.json();
    dispatch(addPortfolioStock(newStock));
  }
};

export const updatePortfolioStockThunk = (stock) => async (dispatch) => {
  const response = await fetch(`/api/portfolio-stocks/${stock.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stock),
  });
  if (response.ok) {
    const updatedStock = await response.json();
    dispatch(updatePortfolioStock(updatedStock));
  }
};

export const deletePortfolioStockThunk = (stockId) => async (dispatch) => {
  const response = await fetch(`/api/portfolio-stocks/${stockId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deletePortfolioStock(stockId));
  }
};

export const fetchInitialData = () => async (dispatch) => {
  const API_KEY = 'c8hkl2qad3id01y88q4g';
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
    dispatch(fetchPortfolioStocksSuccess(stocks));
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }
};

// Initial State
const initialState = {};

// Reducer
const portfolioStockReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PORTFOLIO_STOCKS:
      const newStocks = {};
      action.stocks.forEach((stock) => {
        newStocks[stock.id] = stock;
      });
      return { ...state, ...newStocks };
    case ADD_PORTFOLIO_STOCK:
      return { ...state, [action.stock.id]: action.stock };
    case UPDATE_PORTFOLIO_STOCK:
      return { ...state, [action.stock.id]: action.stock };
    case DELETE_PORTFOLIO_STOCK:
      const newState = { ...state };
      delete newState[action.stockId];
      return newState;
    case FETCH_PORTFOLIO_STOCKS_SUCCESS:
      return {
        ...state,
        stocks: action.payload,
      };
    case UPDATE_PORTFOLIO_STOCK_PRICE:
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

export default portfolioStockReducer;
