

// Action Types
const FETCH_ALGORITHM_CODE_REQUEST = 'FETCH_ALGORITHM_CODE_REQUEST';
const FETCH_ALGORITHM_CODE_SUCCESS = 'FETCH_ALGORITHM_CODE_SUCCESS';
const FETCH_ALGORITHM_CODE_FAILURE = 'FETCH_ALGORITHM_CODE_FAILURE';

// Action Creators
export const fetchAlgorithmCodeRequest = () => ({
  type: FETCH_ALGORITHM_CODE_REQUEST,
});

export const fetchAlgorithmCodeSuccess = (code) => ({
  type: FETCH_ALGORITHM_CODE_SUCCESS,
  payload: code,
});

export const fetchAlgorithmCodeFailure = (error) => ({
  type: FETCH_ALGORITHM_CODE_FAILURE,
  payload: error,
});

// Thunk
export const fetchAlgorithmCode = (indicatorType, parameters) => async (dispatch) => {
  dispatch(fetchAlgorithmCodeRequest());
  try {
    const response = await fetch(`/api/algorithm_blocks/generate_code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        indicator_type: indicatorType,
        ...parameters
      }),
    });
    if (!response.ok) {
      const text = await response.text();
      console.error('Response text:', text);
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    dispatch(fetchAlgorithmCodeSuccess(data.code));
  } catch (error) {
    console.error('Error:', error);  
    dispatch(fetchAlgorithmCodeFailure(error.message));
  }
};


// Initial State
const initialState = {
  code: '',
  loading: false,
  error: null,
};

// Reducer
const algorithmCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALGORITHM_CODE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ALGORITHM_CODE_SUCCESS:
      return { ...state, loading: false, code: action.payload };
    case FETCH_ALGORITHM_CODE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default algorithmCodeReducer;
