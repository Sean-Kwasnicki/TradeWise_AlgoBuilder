// Action Types
const CREATE_WATCHLIST = 'watchlist/CREATE_WATCHLIST';
const GET_WATCHLIST = 'watchlist/GET_WATCHLIST';
const GET_ALL_WATCHLISTS = 'watchlist/GET_ALL_WATCHLISTS';
const UPDATE_WATCHLIST = 'watchlist/UPDATE_WATCHLIST';
const DELETE_WATCHLIST = 'watchlist/DELETE_WATCHLIST';
const ADD_WATCHLIST_STOCK = 'watchlist/ADD_WATCHLIST_STOCK';
const GET_WATCHLIST_STOCKS = 'watchlist/GET_WATCHLIST_STOCKS';
const DELETE_WATCHLIST_STOCK = 'watchlist/DELETE_WATCHLIST_STOCK';

// Action Creators
const createWatchlist = (watchlist) => ({
    type: CREATE_WATCHLIST,
    watchlist
});

const getWatchlist = (watchlist) => ({
    type: GET_WATCHLIST,
    watchlist
});

const getAllWatchlists = (watchlists) => ({
    type: GET_ALL_WATCHLISTS,
    watchlists
});

const updateWatchlist = (watchlist) => ({
    type: UPDATE_WATCHLIST,
    watchlist
});

const deleteWatchlist = (watchlistId) => ({
    type: DELETE_WATCHLIST,
    watchlistId
});

const addWatchlistStock = (stock) => ({
    type: ADD_WATCHLIST_STOCK,
    stock
});

const getWatchlistStocks = (watchlistId, stocks) => ({
    type: GET_WATCHLIST_STOCKS,
    watchlistId,
    stocks
});

const deleteWatchlistStock = (watchlistId, stockId) => ({
    type: DELETE_WATCHLIST_STOCK,
    watchlistId,
    stockId
});

// Thunks
export const createWatchlistThunk = (watchlistData) => async (dispatch) => {
    const response = await fetch('/api/watchlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(watchlistData)
    });

    if (response.ok) {
        const watchlist = await response.json();
        dispatch(createWatchlist(watchlist));
        return watchlist;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const getWatchlistThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const watchlist = await response.json();
        dispatch(getWatchlist(watchlist));
        return watchlist;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const getAllWatchlistsThunk = () => async (dispatch) => {
    const response = await fetch('/api/watchlists', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const watchlists = await response.json();
        dispatch(getAllWatchlists(watchlists));
        return watchlists;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const updateWatchlistThunk = (id, watchlistData) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(watchlistData)
    });

    if (response.ok) {
        const watchlist = await response.json();
        dispatch(updateWatchlist(watchlist));
        return watchlist;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const deleteWatchlistThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        dispatch(deleteWatchlist(id));
        return { message: 'Watchlist deleted successfully' };
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const addWatchlistStockThunk = (watchlistId, stockData) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${watchlistId}/stocks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stockData)
    });

    if (response.ok) {
        const stock = await response.json();
        dispatch(addWatchlistStock(stock));
        return stock;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const getWatchlistStocksThunk = (watchlistId) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${watchlistId}/stocks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const stocks = await response.json();
        dispatch(getWatchlistStocks(watchlistId, stocks));
        return stocks;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const deleteWatchlistStockThunk = (watchlistId, stockId) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${watchlistId}/stocks/${stockId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        dispatch(deleteWatchlistStock(watchlistId, stockId));
        return { message: 'Stock deleted from watchlist successfully' };
    } else {
        const errors = await response.json();
        return errors;
    }
};

// Initial State
const initialState = {
    watchlists: [],
    stocksByWatchlistId: {}
};

// Reducer
export default function watchlistReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_WATCHLIST:
            return {
                ...state,
                watchlists: [...state.watchlists, action.watchlist]
            };
        case GET_WATCHLIST:
            return {
                ...state,
                watchlists: state.watchlists.map((watchlist) =>
                    watchlist.id === action.watchlist.id ? action.watchlist : watchlist
                )
            };
        case GET_ALL_WATCHLISTS:
            return {
                ...state,
                watchlists: action.watchlists
            };
        case UPDATE_WATCHLIST:
            return {
                ...state,
                watchlists: state.watchlists.map((watchlist) =>
                    watchlist.id === action.watchlist.id ? action.watchlist : watchlist
                )
            };
        case DELETE_WATCHLIST:
            const { [action.watchlistId]: _, ...newStocksByWatchlistId } = state.stocksByWatchlistId;
            return {
                ...state,
                watchlists: state.watchlists.filter((watchlist) => watchlist.id !== action.watchlistId),
                stocksByWatchlistId: newStocksByWatchlistId
            };
        case ADD_WATCHLIST_STOCK:
            return {
                ...state,
                stocksByWatchlistId: {
                    ...state.stocksByWatchlistId,
                    [action.stock.watchlist_id]: [...(state.stocksByWatchlistId[action.stock.watchlist_id] || []), action.stock]
                }
            };
        case GET_WATCHLIST_STOCKS:
            return {
                ...state,
                stocksByWatchlistId: {
                    ...state.stocksByWatchlistId,
                    [action.watchlistId]: action.stocks
                }
            };
        case DELETE_WATCHLIST_STOCK:
            return {
                ...state,
                stocksByWatchlistId: {
                    ...state.stocksByWatchlistId,
                    [action.watchlistId]: state.stocksByWatchlistId[action.watchlistId].filter(
                        (stock) => stock.id !== action.stockId
                    )
                }
            };
        default:
            return state;
    }
}
