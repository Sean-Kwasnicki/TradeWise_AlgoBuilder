// Actions
const LOAD_ALGORITHM_BLOCKS = 'algorithmBlocks/LOAD_ALGORITHM_BLOCKS';
const ADD_ALGORITHM_BLOCK = 'algorithmBlocks/ADD_ALGORITHM_BLOCK';
const UPDATE_ALGORITHM_BLOCK = 'algorithmBlocks/UPDATE_ALGORITHM_BLOCK';
const DELETE_ALGORITHM_BLOCK = 'algorithmBlocks/DELETE_ALGORITHM_BLOCK';

// Action Creators
const loadAlgorithmBlocks = (algorithmBlocks) => ({
  type: LOAD_ALGORITHM_BLOCKS,
  algorithmBlocks,
});

const addAlgorithmBlock = (algorithmBlock) => ({
  type: ADD_ALGORITHM_BLOCK,
  algorithmBlock,
});

const updateAlgorithmBlock = (algorithmBlock) => ({
  type: UPDATE_ALGORITHM_BLOCK,
  algorithmBlock,
});

const deleteAlgorithmBlock = (algorithmBlockId) => ({
  type: DELETE_ALGORITHM_BLOCK,
  algorithmBlockId,
});

// Thunks
export const fetchAlgorithmBlocks = () => async (dispatch) => {
  const response = await fetch('/api/algorithm-blocks');
  if (response.ok) {
    const algorithmBlocks = await response.json();
    dispatch(loadAlgorithmBlocks(algorithmBlocks));
  }
};

export const createAlgorithmBlock = (algorithmBlock) => async (dispatch) => {
  const response = await fetch('/api/algorithm-blocks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(algorithmBlock),
  });
  if (response.ok) {
    const newAlgorithmBlock = await response.json();
    dispatch(addAlgorithmBlock(newAlgorithmBlock));
  }
};

export const updateAlgorithmBlockThunk = (algorithmBlock) => async (dispatch) => {
  const response = await fetch(`/api/algorithm-blocks/${algorithmBlock.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(algorithmBlock),
  });
  if (response.ok) {
    const updatedAlgorithmBlock = await response.json();
    dispatch(updateAlgorithmBlock(updatedAlgorithmBlock));
  }
};

export const deleteAlgorithmBlockThunk = (algorithmBlockId) => async (dispatch) => {
  const response = await fetch(`/api/algorithm-blocks/${algorithmBlockId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteAlgorithmBlock(algorithmBlockId));
  }
};

// Reducer
const initialState = {};

const algorithmBlockReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALGORITHM_BLOCKS:
      const newAlgorithmBlocks = {};
      action.algorithmBlocks.forEach((algorithmBlock) => {
        newAlgorithmBlocks[algorithmBlock.id] = algorithmBlock;
      });
      return { ...state, ...newAlgorithmBlocks };
    case ADD_ALGORITHM_BLOCK:
      return { ...state, [action.algorithmBlock.id]: action.algorithmBlock };
    case UPDATE_ALGORITHM_BLOCK:
      return { ...state, [action.algorithmBlock.id]: action.algorithmBlock };
    case DELETE_ALGORITHM_BLOCK:
      const newState = { ...state };
      delete newState[action.algorithmBlockId];
      return newState;
    default:
      return state;
  }
};

export default algorithmBlockReducer;
