// Action Types
const GET_STOCK = 'stocks/GET_STOCK';
const GET_HISTORICAL_PRICES = 'stocks/GET_HISTORICAL_PRICES';
const UPDATE_STOCK = 'stocks/UPDATE_STOCK';
const GET_ALL_STOCKS = 'stocks/GET_ALL_STOCKS';

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

// Thunks
export const fetchStock = (symbol) => async (dispatch) => {
    const response = await fetch(`/api/stocks/symbol/${symbol}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const stock = await response.json();
        dispatch(getStock(stock));
    } else {
        console.error('Failed to fetch stock data');
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
    }
};

// Initial State
const initialState = {
    stock: {},
    historicalPrices: {},
    allStocks: []
};

// Reducer
export default function stockReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STOCK:
            return {
                ...state,
                stock: action.stock
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
                stock: action.stock
            };
        case GET_ALL_STOCKS:
            return {
                ...state,
                allStocks: action.stocks
            };
        default:
            return state;
    }
}
