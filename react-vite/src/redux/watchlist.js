// Actions
const LOAD_WATCHLISTS = 'watchlists/LOAD_WATCHLISTS';
const ADD_WATCHLIST = 'watchlists/ADD_WATCHLIST';
const UPDATE_WATCHLIST = 'watchlists/UPDATE_WATCHLIST';
const DELETE_WATCHLIST = 'watchlists/DELETE_WATCHLIST';

// Action Creators
const loadWatchlists = (watchlists) => ({
  type: LOAD_WATCHLISTS,
  watchlists,
});

const addWatchlist = (watchlist) => ({
  type: ADD_WATCHLIST,
  watchlist,
});

const updateWatchlist = (watchlist) => ({
  type: UPDATE_WATCHLIST,
  watchlist,
});

const deleteWatchlist = (watchlistId) => ({
  type: DELETE_WATCHLIST,
  watchlistId,
});

// Thunks
export const fetchWatchlists = () => async (dispatch) => {
  const response = await fetch('/api/watchlists');
  if (response.ok) {
    const watchlists = await response.json();
    dispatch(loadWatchlists(watchlists));
  }
};

export const createWatchlist = (watchlist) => async (dispatch) => {
  const response = await fetch('/api/watchlists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(watchlist),
  });
  if (response.ok) {
    const newWatchlist = await response.json();
    dispatch(addWatchlist(newWatchlist));
  }
};

export const updateWatchlistThunk = (watchlist) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/${watchlist.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(watchlist),
  });
  if (response.ok) {
    const updatedWatchlist = await response.json();
    dispatch(updateWatchlist(updatedWatchlist));
  }
};

export const deleteWatchlistThunk = (watchlistId) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/${watchlistId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteWatchlist(watchlistId));
  }
};

// Reducer
const initialState = {};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_WATCHLISTS:
      const newWatchlists = {};
      action.watchlists.forEach((watchlist) => {
        newWatchlists[watchlist.id] = watchlist;
      });
      return { ...state, ...newWatchlists };
    case ADD_WATCHLIST:
      return { ...state, [action.watchlist.id]: action.watchlist };
    case UPDATE_WATCHLIST:
      return { ...state, [action.watchlist.id]: action.watchlist };
    case DELETE_WATCHLIST:
      const newState = { ...state };
      delete newState[action.watchlistId];
      return newState;
    default:
      return state;
  }
};

export default watchlistReducer;
