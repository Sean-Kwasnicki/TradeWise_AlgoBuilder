// Actions
const LOAD_PORTFOLIOS = 'portfolios/LOAD_PORTFOLIOS';
const ADD_PORTFOLIO = 'portfolios/ADD_PORTFOLIO';
const UPDATE_PORTFOLIO = 'portfolios/UPDATE_PORTFOLIO';
const DELETE_PORTFOLIO = 'portfolios/DELETE_PORTFOLIO';

// Action Creators
const loadPortfolios = (portfolios) => ({
  type: LOAD_PORTFOLIOS,
  portfolios,
});

const addPortfolio = (portfolio) => ({
  type: ADD_PORTFOLIO,
  portfolio,
});

const updatePortfolio = (portfolio) => ({
  type: UPDATE_PORTFOLIO,
  portfolio,
});

const deletePortfolio = (portfolioId) => ({
  type: DELETE_PORTFOLIO,
  portfolioId,
});

// Thunks
export const fetchPortfolios = () => async (dispatch) => {
  const response = await fetch('/api/portfolios');
  if (response.ok) {
    const portfolios = await response.json();
    dispatch(loadPortfolios(portfolios));
  }
};

export const createPortfolio = (portfolio) => async (dispatch) => {
  const response = await fetch('/api/portfolios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(portfolio),
  });
  if (response.ok) {
    const newPortfolio = await response.json();
    dispatch(addPortfolio(newPortfolio));
  }
};

export const updatePortfolioThunk = (portfolio) => async (dispatch) => {
  const response = await fetch(`/api/portfolios/${portfolio.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(portfolio),
  });
  if (response.ok) {
    const updatedPortfolio = await response.json();
    dispatch(updatePortfolio(updatedPortfolio));
  }
};

export const deletePortfolioThunk = (portfolioId) => async (dispatch) => {
  const response = await fetch(`/api/portfolios/${portfolioId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deletePortfolio(portfolioId));
  }
};

// Reducer
const initialState = {};

const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PORTFOLIOS:
      const newPortfolios = {};
      action.portfolios.forEach((portfolio) => {
        newPortfolios[portfolio.id] = portfolio;
      });
      return { ...state, ...newPortfolios };
    case ADD_PORTFOLIO:
      return { ...state, [action.portfolio.id]: action.portfolio };
    case UPDATE_PORTFOLIO:
      return { ...state, [action.portfolio.id]: action.portfolio };
    case DELETE_PORTFOLIO:
      const newState = { ...state };
      delete newState[action.portfolioId];
      return newState;
    default:
      return state;
  }
};

export default portfolioReducer;
