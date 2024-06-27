import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import algorithmReducer from "./algorithm";
import algorithmBlockReducer from "./algorithmBlock";
import backtestReducer from "./backtest";
import portfolioReducer from "./portfolio";
import stockReducer from "./stock";
import userReducer from "./user";
import watchlistReducer from "./watchlist";


const rootReducer = combineReducers({
  session: sessionReducer,
  algorithm: algorithmReducer,
  algorithmBlock: algorithmBlockReducer,
  backtest: backtestReducer,
  portfolio: portfolioReducer,
  stocks: stockReducer,
  user: userReducer,
  watchlist: watchlistReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
