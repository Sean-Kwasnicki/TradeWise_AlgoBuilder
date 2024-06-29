// Action Types
const GET_STOCK = 'stocks/GET_STOCK';
const GET_HISTORICAL_PRICES = 'stocks/GET_HISTORICAL_PRICES';
const UPDATE_STOCK = 'stocks/UPDATE_STOCK';
const GET_ALL_STOCKS = 'stocks/GET_ALL_STOCKS';
const SET_STOCK_ERROR = 'stocks/SET_STOCK_ERROR';
const CLEAR_STOCK_ERROR = 'stocks/CLEAR_STOCK_ERROR';

// Action Creators
const getStock = (stock) => ({
    type: GET_STOCK,
    stock
});

const getHistoricalPrices = (symbol, prices) => ({
    type: GET_HISTORICAL_PRICES,
    symbol,
    prices
});

const updateStock = (stock) => ({
    type: UPDATE_STOCK,
    stock
});

const getAllStocks = (stocks) => ({
    type: GET_ALL_STOCKS,
    stocks
});

const setStockError = (error) => ({
    type: SET_STOCK_ERROR,
    error
});

const clearStockError = () => ({
    type: CLEAR_STOCK_ERROR
});

// Thunks
export const fetchStock = (symbol) => async (dispatch) => {
    dispatch(clearStockError());
    const response = await fetch(`/api/stocks/symbol/${symbol}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const stock = await response.json();
        console.log('Stock fetched from API:', stock);
        if (stock) {
            dispatch(getStock(stock));
        } else {
            dispatch(setStockError('No company found with the provided stock symbol. Please try again.'));
        }
    } else {
        console.error('Failed to fetch stock data');
        dispatch(setStockError('Failed to fetch stock data. Please try again.'));
    }
};

export const fetchHistoricalPrices = (symbol) => async (dispatch) => {
    const response = await fetch(`/api/stocks/symbol/${symbol}/historical_prices`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const prices = await response.json();
        dispatch(getHistoricalPrices(symbol, prices));
    } else {
        console.error('Failed to fetch historical prices');
        dispatch(setStockError('Failed to fetch historical prices. Please try again.'));
    }
};

export const updateStockPrice = (symbol) => async (dispatch) => {
    const response = await fetch(`/api/stocks/update/${symbol}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const stock = await response.json();
        dispatch(updateStock(stock));
    } else {
        console.error('Failed to update stock price');
        dispatch(setStockError('Failed to update stock price. Please try again.'));
    }
};

export const fetchAllStocks = () => async (dispatch) => {
    const response = await fetch('/api/stocks/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const stocks = await response.json();
        dispatch(getAllStocks(stocks));
    } else {
        console.error('Failed to fetch all stocks');
        dispatch(setStockError('Failed to fetch all stocks. Please try again.'));
    }
};

// Initial State
const initialState = {
    stocks: {},
    historicalPrices: {},
    allStocks: [],
    error: null
};

// Reducer
export default function stockReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STOCK:
            console.log('GET_STOCK action:', action.stock);
            return {
                ...state,
                stocks: {
                    ...state.stocks,
                    [action.stock.symbol]: action.stock
                }
            };
        case GET_HISTORICAL_PRICES:
            return {
                ...state,
                historicalPrices: {
                    ...state.historicalPrices,
                    [action.symbol]: action.prices
                }
            };
        case UPDATE_STOCK:
            return {
                ...state,
                stocks: {
                    ...state.stocks,
                    [action.stock.symbol]: action.stock
                }
            };
        case GET_ALL_STOCKS:
            return {
                ...state,
                allStocks: action.stocks
            };
        case SET_STOCK_ERROR:
            return {
                ...state,
                error: action.error
            };
        case CLEAR_STOCK_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}
