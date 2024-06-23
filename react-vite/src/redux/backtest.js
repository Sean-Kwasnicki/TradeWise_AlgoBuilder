// Actions
const LOAD_BACKTESTS = 'backtests/LOAD_BACKTESTS';
const ADD_BACKTEST = 'backtests/ADD_BACKTEST';
const UPDATE_BACKTEST = 'backtests/UPDATE_BACKTEST';
const DELETE_BACKTEST = 'backtests/DELETE_BACKTEST';

// Action Creators
const loadBacktests = (backtests) => ({
  type: LOAD_BACKTESTS,
  backtests,
});

const addBacktest = (backtest) => ({
  type: ADD_BACKTEST,
  backtest,
});

const updateBacktest = (backtest) => ({
  type: UPDATE_BACKTEST,
  backtest,
});

const deleteBacktest = (backtestId) => ({
  type: DELETE_BACKTEST,
  backtestId,
});

// Thunks
export const fetchBacktests = () => async (dispatch) => {
  const response = await fetch('/api/backtests');
  if (response.ok) {
    const backtests = await response.json();
    dispatch(loadBacktests(backtests));
  }
};

export const createBacktest = (backtest) => async (dispatch) => {
  const response = await fetch('/api/backtests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(backtest),
  });
  if (response.ok) {
    const newBacktest = await response.json();
    dispatch(addBacktest(newBacktest));
  }
};

export const updateBacktestThunk = (backtest) => async (dispatch) => {
  const response = await fetch(`/api/backtests/${backtest.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(backtest),
  });
  if (response.ok) {
    const updatedBacktest = await response.json();
    dispatch(updateBacktest(updatedBacktest));
  }
};

export const deleteBacktestThunk = (backtestId) => async (dispatch) => {
  const response = await fetch(`/api/backtests/${backtestId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteBacktest(backtestId));
  }
};

// Reducer
const initialState = {};

const backtestReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BACKTESTS:
      const newBacktests = {};
      action.backtests.forEach((backtest) => {
        newBacktests[backtest.id] = backtest;
      });
      return { ...state, ...newBacktests };
    case ADD_BACKTEST:
      return { ...state, [action.backtest.id]: action.backtest };
    case UPDATE_BACKTEST:
      return { ...state, [action.backtest.id]: action.backtest };
    case DELETE_BACKTEST:
      const newState = { ...state };
      delete newState[action.backtestId];
      return newState;
    default:
      return state;
  }
};

export default backtestReducer;
