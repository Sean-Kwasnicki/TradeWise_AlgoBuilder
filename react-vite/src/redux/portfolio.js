// Action Types
const CREATE_PORTFOLIO = 'portfolio/CREATE_PORTFOLIO';
const GET_PORTFOLIO = 'portfolio/GET_PORTFOLIO';
const GET_ALL_PORTFOLIOS = 'portfolio/GET_ALL_PORTFOLIOS';
const UPDATE_PORTFOLIO = 'portfolio/UPDATE_PORTFOLIO';
const DELETE_PORTFOLIO = 'portfolio/DELETE_PORTFOLIO';
const ADD_PORTFOLIO_STOCK = 'portfolio/ADD_PORTFOLIO_STOCK';
const GET_PORTFOLIO_STOCKS = 'portfolio/GET_PORTFOLIO_STOCKS';
const UPDATE_PORTFOLIO_STOCK = 'portfolio/UPDATE_PORTFOLIO_STOCK';
const DELETE_PORTFOLIO_STOCK = 'portfolio/DELETE_PORTFOLIO_STOCK';

// Action Creators
const createPortfolio = (portfolio) => ({
    type: CREATE_PORTFOLIO,
    portfolio
});

const getPortfolio = (portfolio) => ({
    type: GET_PORTFOLIO,
    portfolio
});

const getAllPortfolios = (portfolios) => ({
    type: GET_ALL_PORTFOLIOS,
    portfolios
});

const updatePortfolio = (portfolio) => ({
    type: UPDATE_PORTFOLIO,
    portfolio
});

const deletePortfolio = (portfolioId) => ({
    type: DELETE_PORTFOLIO,
    portfolioId
});

const addPortfolioStock = (stock) => ({
    type: ADD_PORTFOLIO_STOCK,
    stock
});

const getPortfolioStocks = (portfolioId, stocks) => ({
    type: GET_PORTFOLIO_STOCKS,
    portfolioId,
    stocks
});

const updatePortfolioStock = (stock) => ({
    type: UPDATE_PORTFOLIO_STOCK,
    stock
});

const deletePortfolioStock = (portfolioId, stockId) => ({
    type: DELETE_PORTFOLIO_STOCK,
    portfolioId,
    stockId
});

// Thunks
export const createPortfolioThunk = (portfolioData) => async (dispatch) => {
    try {
        const response = await fetch('/api/portfolios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(portfolioData)
        });

        if (response.ok) {
            const portfolio = await response.json();
            dispatch(createPortfolio(portfolio));
            return portfolio;
        } else {
            const errors = await response.json();
            console.error('Failed to create portfolio:', errors); // Log errors for debugging
            return errors;
        }
    } catch (error) {
        console.error('Error creating portfolio:', error); // Log any unexpected errors
        return { error: 'Failed to create portfolio' };
    }
};

export const getPortfolioThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/portfolios/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const portfolio = await response.json();
        dispatch(getPortfolio(portfolio));
        return portfolio;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const getAllPortfoliosThunk = () => async (dispatch) => {
    const response = await fetch('/api/portfolios/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const portfolios = await response.json();
        dispatch(getAllPortfolios(portfolios));
        return portfolios;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const updatePortfolioThunk = (id, portfolioData) => async (dispatch) => {
    const response = await fetch(`/api/portfolios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(portfolioData)
    });

    if (response.ok) {
        const portfolio = await response.json();
        dispatch(updatePortfolio(portfolio));
        return portfolio;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const deletePortfolioThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/portfolios/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        dispatch(deletePortfolio(id));
        return { message: 'Portfolio deleted successfully' };
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const addPortfolioStockThunk = (portfolioId, stockData) => async (dispatch) => {
  try {
      const response = await fetch(`/api/portfolios/${portfolioId}/stocks`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(stockData)
      });

      if (response.ok) {
          const stock = await response.json();
          dispatch(addPortfolioStock(stock));
          return stock;
      } else {
          const errors = await response.json();
          console.error(errors); // Log the errors to help with debugging
          return errors;
      }
  } catch (error) {
      console.error('Error adding stock to portfolio:', error);
      return { error: 'Failed to add stock to portfolio' };
  }
};


export const getPortfolioStocksThunk = (portfolioId) => async (dispatch) => {
    const response = await fetch(`/api/portfolios/${portfolioId}/stocks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const stocks = await response.json();
        dispatch(getPortfolioStocks(portfolioId, stocks));
        return stocks;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const updatePortfolioStockThunk = (portfolioId, stockId, stockData) => async (dispatch) => {
    const response = await fetch(`/api/portfolios/${portfolioId}/stocks/${stockId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stockData)
    });

    if (response.ok) {
        const stock = await response.json();
        dispatch(updatePortfolioStock(stock));
        return stock;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const deletePortfolioStockThunk = (portfolioId, stockId) => async (dispatch) => {
    const response = await fetch(`/api/portfolios/${portfolioId}/stocks/${stockId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        dispatch(deletePortfolioStock(portfolioId, stockId));
        return { message: 'Stock deleted from portfolio successfully' };
    } else {
        const errors = await response.json();
        return errors;
    }
};

// Initial State
const initialState = {
    portfolios: [],
    stocksByPortfolioId: {}
};

// Reducer
export default function portfolioReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_PORTFOLIO:
            return {
                ...state,
                portfolios: [...state.portfolios, action.portfolio]
            };
        case GET_PORTFOLIO:
            return {
                ...state,
                portfolios: state.portfolios.map((portfolio) =>
                    portfolio.id === action.portfolio.id ? action.portfolio : portfolio
                )
            };
        case GET_ALL_PORTFOLIOS:
            return {
                ...state,
                portfolios: action.portfolios
            };
        case UPDATE_PORTFOLIO:
            return {
                ...state,
                portfolios: state.portfolios.map((portfolio) =>
                    portfolio.id === action.portfolio.id ? action.portfolio : portfolio
                )
            };
        case DELETE_PORTFOLIO:
            return {
                ...state,
                portfolios: state.portfolios.filter((portfolio) => portfolio.id !== action.portfolioId)
            };
        case ADD_PORTFOLIO_STOCK:
            return {
                ...state,
                stocksByPortfolioId: {
                    ...state.stocksByPortfolioId,
                    [action.stock.portfolio_id]: [...(state.stocksByPortfolioId[action.stock.portfolio_id] || []), action.stock]
                }
            };
        case GET_PORTFOLIO_STOCKS:
            return {
                ...state,
                stocksByPortfolioId: {
                    ...state.stocksByPortfolioId,
                    [action.portfolioId]: action.stocks
                }
            };
        case UPDATE_PORTFOLIO_STOCK:
            return {
                ...state,
                stocksByPortfolioId: {
                    ...state.stocksByPortfolioId,
                    [action.stock.portfolio_id]: state.stocksByPortfolioId[action.stock.portfolio_id].map((stock) =>
                        stock.id === action.stock.id ? action.stock : stock
                    )
                }
            };
            case DELETE_PORTFOLIO_STOCK:
                return {
                    ...state,
                    stocksByPortfolioId: {
                        ...state.stocksByPortfolioId,
                        [action.portfolioId]: state.stocksByPortfolioId[action.portfolioId].filter(
                            (stock) => stock.id !== action.stockId
                        )
                    }
                };
        default:
            return state;
    }
}
