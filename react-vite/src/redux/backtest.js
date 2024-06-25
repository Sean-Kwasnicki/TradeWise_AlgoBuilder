// src/store/backtest.js

// Action Types
const CREATE_BACKTEST = 'backtest/CREATE_BACKTEST';
const GET_BACKTEST = 'backtest/GET_BACKTEST';
const GET_ALL_BACKTESTS = 'backtest/GET_ALL_BACKTESTS';
const UPDATE_BACKTEST = 'backtest/UPDATE_BACKTEST';
const DELETE_BACKTEST = 'backtest/DELETE_BACKTEST';

// Action Creators
const createBacktest = (backtest) => ({
    type: CREATE_BACKTEST,
    backtest
});

const getBacktest = (backtest) => ({
    type: GET_BACKTEST,
    backtest
});

const getAllBacktests = (backtests) => ({
    type: GET_ALL_BACKTESTS,
    backtests
});

const updateBacktest = (backtest) => ({
    type: UPDATE_BACKTEST,
    backtest
});

const deleteBacktest = (backtestId) => ({
    type: DELETE_BACKTEST,
    backtestId
});

// Thunks
export const createBacktestThunk = (backtestData) => async (dispatch) => {
    const response = await fetch('/api/backtests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(backtestData)
    });

    if (response.ok) {
        const backtest = await response.json();
        dispatch(createBacktest(backtest));
        return backtest;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const getBacktestThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/backtests/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const backtest = await response.json();
        dispatch(getBacktest(backtest));
        return backtest;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const getAllBacktestsThunk = () => async (dispatch) => {
    const response = await fetch('/api/backtests', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const backtests = await response.json();
        dispatch(getAllBacktests(backtests));
        return backtests;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const updateBacktestThunk = (id, backtestData) => async (dispatch) => {
    const response = await fetch(`/api/backtests/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(backtestData)
    });

    if (response.ok) {
        const backtest = await response.json();
        dispatch(updateBacktest(backtest));
        return backtest;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const deleteBacktestThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/backtests/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        dispatch(deleteBacktest(id));
        return { message: 'Backtest deleted successfully' };
    } else {
        const errors = await response.json();
        return errors;
    }
};

// Initial State
const initialState = {
    backtest: {},
    backtests: []
};

// Reducer
export default function backtestReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_BACKTEST:
            return {
                ...state,
                backtests: [...state.backtests, action.backtest]
            };
        case GET_BACKTEST:
            return {
                ...state,
                backtest: action.backtest
            };
        case GET_ALL_BACKTESTS:
            return {
                ...state,
                backtests: action.backtests
            };
        case UPDATE_BACKTEST:
            return {
                ...state,
                backtests: state.backtests.map((backtest) =>
                    backtest.id === action.backtest.id ? action.backtest : backtest
                )
            };
        case DELETE_BACKTEST:
            return {
                ...state,
                backtests: state.backtests.filter((backtest) => backtest.id !== action.backtestId)
            };
        default:
            return state;
    }
}
