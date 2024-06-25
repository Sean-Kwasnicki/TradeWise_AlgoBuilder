// src/store/algorithm.js

// Action Types
const CREATE_ALGORITHM = 'algorithm/CREATE_ALGORITHM';
const GET_ALGORITHM = 'algorithm/GET_ALGORITHM';
const GET_ALL_ALGORITHMS = 'algorithm/GET_ALL_ALGORITHMS';
const UPDATE_ALGORITHM = 'algorithm/UPDATE_ALGORITHM';
const DELETE_ALGORITHM = 'algorithm/DELETE_ALGORITHM';

// Action Creators
const createAlgorithm = (algorithm) => ({
    type: CREATE_ALGORITHM,
    algorithm
});

const getAlgorithm = (algorithm) => ({
    type: GET_ALGORITHM,
    algorithm
});

const getAllAlgorithms = (algorithms) => ({
    type: GET_ALL_ALGORITHMS,
    algorithms
});

const updateAlgorithm = (algorithm) => ({
    type: UPDATE_ALGORITHM,
    algorithm
});

const deleteAlgorithm = (algorithmId) => ({
    type: DELETE_ALGORITHM,
    algorithmId
});

// Thunks
export const createAlgorithmThunk = (algorithmData) => async (dispatch) => {
    const response = await fetch('/api/algorithms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(algorithmData)
    });

    if (response.ok) {
        const algorithm = await response.json();
        dispatch(createAlgorithm(algorithm));
        return algorithm;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const getAlgorithmThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/algorithms/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const algorithm = await response.json();
        dispatch(getAlgorithm(algorithm));
        return algorithm;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const getAllAlgorithmsThunk = () => async (dispatch) => {
    const response = await fetch('/api/algorithms', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const algorithms = await response.json();
        dispatch(getAllAlgorithms(algorithms));
        return algorithms;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const updateAlgorithmThunk = (id, algorithmData) => async (dispatch) => {
    const response = await fetch(`/api/algorithms/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(algorithmData)
    });

    if (response.ok) {
        const algorithm = await response.json();
        dispatch(updateAlgorithm(algorithm));
        return algorithm;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const deleteAlgorithmThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/algorithms/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        dispatch(deleteAlgorithm(id));
        return { message: 'Algorithm deleted successfully' };
    } else {
        const errors = await response.json();
        return errors;
    }
};

// Initial State
const initialState = {
    algorithm: {},
    algorithms: []
};

// Reducer
export default function algorithmReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_ALGORITHM:
            return {
                ...state,
                algorithms: [...state.algorithms, action.algorithm]
            };
        case GET_ALGORITHM:
            return {
                ...state,
                algorithm: action.algorithm
            };
        case GET_ALL_ALGORITHMS:
            return {
                ...state,
                algorithms: action.algorithms
            };
        case UPDATE_ALGORITHM:
            return {
                ...state,
                algorithms: state.algorithms.map((algorithm) =>
                    algorithm.id === action.algorithm.id ? action.algorithm : algorithm
                )
            };
        case DELETE_ALGORITHM:
            return {
                ...state,
                algorithms: state.algorithms.filter((algorithm) => algorithm.id !== action.algorithmId)
            };
        default:
            return state;
    }
}
