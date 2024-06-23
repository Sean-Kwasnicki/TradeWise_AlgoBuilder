// Actions
const LOAD_STOCK_HISTORICAL_PRICES = 'stockHistoricalPrices/LOAD_STOCK_HISTORICAL_PRICES';
const ADD_STOCK_HISTORICAL_PRICE = 'stockHistoricalPrices/ADD_STOCK_HISTORICAL_PRICE';
const UPDATE_STOCK_HISTORICAL_PRICE = 'stockHistoricalPrices/UPDATE_STOCK_HISTORICAL_PRICE';
const DELETE_STOCK_HISTORICAL_PRICE = 'stockHistoricalPrices/DELETE_STOCK_HISTORICAL_PRICE';

// Action Creators
const loadStockHistoricalPrices = (stockHistoricalPrices) => ({
  type: LOAD_STOCK_HISTORICAL_PRICES,
  stockHistoricalPrices,
});

const addStockHistoricalPrice = (stockHistoricalPrice) => ({
  type: ADD_STOCK_HISTORICAL_PRICE,
  stockHistoricalPrice,
});

const updateStockHistoricalPrice = (stockHistoricalPrice) => ({
  type: UPDATE_STOCK_HISTORICAL_PRICE,
  stockHistoricalPrice,
});

const deleteStockHistoricalPrice = (stockHistoricalPriceId) => ({
  type: DELETE_STOCK_HISTORICAL_PRICE,
  stockHistoricalPriceId,
});

// Thunks
export const fetchStockHistoricalPrices = () => async (dispatch) => {
  const response = await fetch('/api/stock-historical-prices');
  if (response.ok) {
    const stockHistoricalPrices = await response.json();
    dispatch(loadStockHistoricalPrices(stockHistoricalPrices));
  }
};

export const createStockHistoricalPrice = (stockHistoricalPrice) => async (dispatch) => {
  const response = await fetch('/api/stock-historical-prices', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stockHistoricalPrice),
  });
  if (response.ok) {
    const newStockHistoricalPrice = await response.json();
    dispatch(addStockHistoricalPrice(newStockHistoricalPrice));
  }
};

export const updateStockHistoricalPriceThunk = (stockHistoricalPrice) => async (dispatch) => {
  const response = await fetch(`/api/stock-historical-prices/${stockHistoricalPrice.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stockHistoricalPrice),
  });
  if (response.ok) {
    const updatedStockHistoricalPrice = await response.json();
    dispatch(updateStockHistoricalPrice(updatedStockHistoricalPrice));
  }
};

export const deleteStockHistoricalPriceThunk = (stockHistoricalPriceId) => async (dispatch) => {
  const response = await fetch(`/api/stock-historical-prices/${stockHistoricalPriceId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteStockHistoricalPrice(stockHistoricalPriceId));
  }
};

// Reducer
const initialState = {};

const stockHistoricalPriceReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STOCK_HISTORICAL_PRICES:
      const newStockHistoricalPrices = {};
      action.stockHistoricalPrices.forEach((stockHistoricalPrice) => {
        newStockHistoricalPrices[stockHistoricalPrice.id] = stockHistoricalPrice;
      });
      return { ...state, ...newStockHistoricalPrices };
    case ADD_STOCK_HISTORICAL_PRICE:
      return { ...state, [action.stockHistoricalPrice.id]: action.stockHistoricalPrice };
    case UPDATE_STOCK_HISTORICAL_PRICE:
      return { ...state, [action.stockHistoricalPrice.id]: action.stockHistoricalPrice };
    case DELETE_STOCK_HISTORICAL_PRICE:
      const newState = { ...state };
      delete newState[action.stockHistoricalPriceId];
      return newState;
    default:
      return state;
  }
};

export default stockHistoricalPriceReducer;
