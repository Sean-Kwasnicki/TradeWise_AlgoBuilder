// Actions
const LOAD_ALGORITHMS = 'algorithms/LOAD_ALGORITHMS';
const ADD_ALGORITHM = 'algorithms/ADD_ALGORITHM';
const UPDATE_ALGORITHM = 'algorithms/UPDATE_ALGORITHM';
const DELETE_ALGORITHM = 'algorithms/DELETE_ALGORITHM';

// Action Creators
const loadAlgorithms = (algorithms) => ({
  type: LOAD_ALGORITHMS,
  algorithms,
});

const addAlgorithm = (algorithm) => ({
  type: ADD_ALGORITHM,
  algorithm,
});

const updateAlgorithm = (algorithm) => ({
  type: UPDATE_ALGORITHM,
  algorithm,
});

const deleteAlgorithm = (algorithmId) => ({
  type: DELETE_ALGORITHM,
  algorithmId,
});

// Thunks
export const fetchAlgorithms = () => async (dispatch) => {
  const response = await fetch('/api/algorithms');
  if (response.ok) {
    const algorithms = await response.json();
    dispatch(loadAlgorithms(algorithms));
  }
};

export const createAlgorithm = (algorithm) => async (dispatch) => {
  const response = await fetch('/api/algorithms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(algorithm),
  });
  if (response.ok) {
    const newAlgorithm = await response.json();
    dispatch(addAlgorithm(newAlgorithm));
  }
};

export const updateAlgorithmThunk = (algorithm) => async (dispatch) => {
  const response = await fetch(`/api/algorithms/${algorithm.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(algorithm),
  });
  if (response.ok) {
    const updatedAlgorithm = await response.json();
    dispatch(updateAlgorithm(updatedAlgorithm));
  }
};

export const deleteAlgorithmThunk = (algorithmId) => async (dispatch) => {
  const response = await fetch(`/api/algorithms/${algorithmId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteAlgorithm(algorithmId));
  }
};

// Reducer
const initialState = {};

const algorithmReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALGORITHMS:
      const newAlgorithms = {};
      action.algorithms.forEach((algorithm) => {
        newAlgorithms[algorithm.id] = algorithm;
      });
      return { ...state, ...newAlgorithms };
    case ADD_ALGORITHM:
      return { ...state, [action.algorithm.id]: action.algorithm };
    case UPDATE_ALGORITHM:
      return { ...state, [action.algorithm.id]: action.algorithm };
    case DELETE_ALGORITHM:
      const newState = { ...state };
      delete newState[action.algorithmId];
      return newState;
    default:
      return state;
  }
};

export default algorithmReducer;
