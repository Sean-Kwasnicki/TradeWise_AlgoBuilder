// Action Types
const GET_HISTORICAL_PRICE = 'stock/GET_HISTORICAL_PRICE';

// Action Creators
const getHistoricalPrice = (symbol, price) => ({
    type: GET_HISTORICAL_PRICE,
    symbol,
    price,
});

// Thunks
export const fetchHistoricalPrice = (symbol) => async (dispatch) => {
    const response = await fetch(`/api/stocks/symbol/${symbol}/historical_prices`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const price = await response.json();
        dispatch(getHistoricalPrice(symbol, price));
    } else {
        console.error('Failed to fetch historical price');
    }
};

// Initial State
const initialState = {
    historicalPrices: {},
};

// Reducer
export default function stockHistoricalReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HISTORICAL_PRICE:
            return {
                ...state,
                historicalPrices: {
                    ...state.historicalPrices,
                    [action.symbol]: action.price,
                }
            };
        default:
            return state;
    }
}
