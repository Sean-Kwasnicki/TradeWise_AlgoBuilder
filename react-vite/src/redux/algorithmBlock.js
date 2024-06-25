// src/store/algorithmBlock.js

// Action Types
const CREATE_ALGORITHM_BLOCK = 'algorithmBlock/CREATE_ALGORITHM_BLOCK';
const UPDATE_ALGORITHM_BLOCK = 'algorithmBlock/UPDATE_ALGORITHM_BLOCK';
const DELETE_ALGORITHM_BLOCK = 'algorithmBlock/DELETE_ALGORITHM_BLOCK';

// Action Creators
const createAlgorithmBlock = (block) => ({
    type: CREATE_ALGORITHM_BLOCK,
    block
});

const updateAlgorithmBlock = (block) => ({
    type: UPDATE_ALGORITHM_BLOCK,
    block
});

const deleteAlgorithmBlock = (blockId) => ({
    type: DELETE_ALGORITHM_BLOCK,
    blockId
});

// Thunks
export const createAlgorithmBlockThunk = (blockData) => async (dispatch) => {
    const response = await fetch('/api/algorithm_blocks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blockData)
    });

    if (response.ok) {
        const block = await response.json();
        dispatch(createAlgorithmBlock(block));
        return block;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const updateAlgorithmBlockThunk = (id, blockData) => async (dispatch) => {
    const response = await fetch(`/api/algorithm_blocks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blockData)
    });

    if (response.ok) {
        const block = await response.json();
        dispatch(updateAlgorithmBlock(block));
        return block;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const deleteAlgorithmBlockThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/algorithm_blocks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        dispatch(deleteAlgorithmBlock(id));
        return { message: 'Block deleted successfully' };
    } else {
        const errors = await response.json();
        return errors;
    }
};

// Initial State
const initialState = {
    blocks: []
};

// Reducer
export default function algorithmBlockReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_ALGORITHM_BLOCK:
            return {
                ...state,
                blocks: [...state.blocks, action.block]
            };
        case UPDATE_ALGORITHM_BLOCK:
            return {
                ...state,
                blocks: state.blocks.map((block) =>
                    block.id === action.block.id ? action.block : block
                )
            };
        case DELETE_ALGORITHM_BLOCK:
            return {
                ...state,
                blocks: state.blocks.filter((block) => block.id !== action.blockId)
            };
        default:
            return state;
    }
}
