// algorithmLibrary.js

// Action Types
const FETCH_LIBRARIES_REQUEST = 'FETCH_LIBRARIES_REQUEST';
const FETCH_LIBRARIES_SUCCESS = 'FETCH_LIBRARIES_SUCCESS';
const FETCH_LIBRARIES_FAILURE = 'FETCH_LIBRARIES_FAILURE';
const ADD_LIBRARY = 'ADD_LIBRARY';
const DELETE_LIBRARY = 'DELETE_LIBRARY';
const EDIT_LIBRARY = 'EDIT_LIBRARY';
const FETCH_ALGORITHMS_SUCCESS = 'FETCH_ALGORITHMS_SUCCESS';
const ADD_ALGORITHM = 'ADD_ALGORITHM';
const DELETE_ALGORITHM = 'DELETE_ALGORITHM';
const EDIT_ALGORITHM = 'EDIT_ALGORITHM';

// Action Creators
const fetchLibrariesRequest = () => ({ type: FETCH_LIBRARIES_REQUEST });
const fetchLibrariesSuccess = (libraries) => ({ type: FETCH_LIBRARIES_SUCCESS, payload: libraries });
const fetchLibrariesFailure = (error) => ({ type: FETCH_LIBRARIES_FAILURE, payload: error });

export const fetchLibraries = () => async (dispatch) => {
  dispatch(fetchLibrariesRequest());
  try {
    const response = await fetch('/api/libraries');
    const data = await response.json();
    dispatch(fetchLibrariesSuccess(data));
  } catch (error) {
    dispatch(fetchLibrariesFailure(error.message));
  }
};

export const addLibrary = (library) => ({ type: ADD_LIBRARY, payload: library });
export const deleteLibrary = (id) => ({ type: DELETE_LIBRARY, payload: id });
export const editLibrary = (library) => ({ type: EDIT_LIBRARY, payload: library });

export const fetchAlgorithmsSuccess = (libraryId, algorithms) => ({
  type: FETCH_ALGORITHMS_SUCCESS,
  payload: { libraryId, algorithms },
});

export const fetchAlgorithms = (libraryId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/libraries/${libraryId}/algorithms`);
    const data = await response.json();
    dispatch(fetchAlgorithmsSuccess(libraryId, data));
  } catch (error) {
    console.error('Failed to fetch algorithms', error);
  }
};

export const addAlgorithm = ({ libraryId, algorithm }) => ({
  type: ADD_ALGORITHM,
  payload: { libraryId, algorithm },
});

export const deleteAlgorithm = ({ libraryId, algorithmId }) => ({
  type: DELETE_ALGORITHM,
  payload: { libraryId, algorithmId },
});

export const editAlgorithm = ({ libraryId, algorithmId, updates }) => ({
  type: EDIT_ALGORITHM,
  payload: { libraryId, algorithmId, updates },
});

// Initial State
const initialState = {
  libraries: [],
  loading: false,
  error: null,
};

// Reducer
const algorithmLibraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIBRARIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_LIBRARIES_SUCCESS:
      return { ...state, loading: false, libraries: action.payload };
    case FETCH_LIBRARIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_LIBRARY:
      return { ...state, libraries: [...state.libraries, action.payload] };
    case DELETE_LIBRARY:
      return {
        ...state,
        libraries: state.libraries.filter((lib) => lib.id !== action.payload),
      };
    case EDIT_LIBRARY:
      return {
        ...state,
        libraries: state.libraries.map((lib) =>
          lib.id === action.payload.id ? { ...lib, name: action.payload.name } : lib
        ),
      };
    case FETCH_ALGORITHMS_SUCCESS:
      return {
        ...state,
        libraries: state.libraries.map((lib) =>
          lib.id === action.payload.libraryId
            ? { ...lib, algorithms: action.payload.algorithms }
            : lib
        ),
      };
    case ADD_ALGORITHM:
      return {
        ...state,
        libraries: state.libraries.map((lib) =>
          lib.id === action.payload.libraryId
            ? { ...lib, algorithms: [...lib.algorithms, action.payload.algorithm] }
            : lib
        ),
      };
    case DELETE_ALGORITHM:
      return {
        ...state,
        libraries: state.libraries.map((lib) =>
          lib.id === action.payload.libraryId
            ? {
                ...lib,
                algorithms: lib.algorithms.filter(
                  (alg) => alg.id !== action.payload.algorithmId
                ),
              }
            : lib
        ),
      };
    case EDIT_ALGORITHM:
      return {
        ...state,
        libraries: state.libraries.map((lib) =>
          lib.id === action.payload.libraryId
            ? {
                ...lib,
                algorithms: lib.algorithms.map((alg) =>
                  alg.id === action.payload.algorithmId ? { ...alg, ...action.payload.updates } : alg
                ),
              }
            : lib
        ),
      };
    default:
      return state;
  }
};

export default algorithmLibraryReducer;
