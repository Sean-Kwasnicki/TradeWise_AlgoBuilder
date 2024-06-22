# TradeWise API Routes Outline

## Users

### Create User
- **POST /api/users**
  - Description: Creates a new user.

### Get User
- **GET /api/users/:id**
  - Description: Retrieves details of a specific user by ID.

### Update User
- **PUT /api/users/:id**
  - Description: Updates details of a specific user by ID.

### Delete User
- **DELETE /api/users/:id**
  - Description: Deletes a specific user by ID.

### Get All Users
- **GET /api/users**
  - Description: Retrieves a list of all users.

## Portfolios

### Create Portfolio
- **POST /api/portfolios**
  - Description: Creates a new portfolio.

### Get Portfolio
- **GET /api/portfolios/:id**
  - Description: Retrieves details of a specific portfolio by ID.

### Get All Portfolios
- **GET /api/portfolios**
  - Description: Retrieves a list of all portfolios.

### Update Portfolio
- **PUT /api/portfolios/:id**
  - Description: Updates details of a specific portfolio by ID.

### Delete Portfolio
- **DELETE /api/portfolios/:id**
  - Description: Deletes a specific portfolio by ID.

## Portfolio Stocks

### Add Stock to Portfolio
- **POST /api/portfolios/:portfolio_id/stocks**
  - Description: Adds a stock to a specific portfolio.

### Get Portfolio Stocks
- **GET /api/portfolios/:portfolio_id/stocks**
  - Description: Retrieves all stocks in a specific portfolio.

### Update Portfolio Stock
- **PUT /api/portfolios/:portfolio_id/stocks/:id**
  - Description: Updates details of a specific stock in a portfolio.

### Delete Portfolio Stock
- **DELETE /api/portfolios/:portfolio_id/stocks/:id**
  - Description: Deletes a specific stock from a portfolio.

## Stocks

### Get Stock
- **GET /api/stocks/:id**
  - Description: Retrieves details of a specific stock by ID.

## Stock Historical Prices

### Get Historical Prices
- **GET /api/stocks/:stock_id/historical_prices**
  - Description: Retrieves historical price data for a specific stock.

## Watchlists

### Create Watchlist
- **POST /api/watchlists**
  - Description: Creates a new watchlist.

### Get Watchlist
- **GET /api/watchlists/:id**
  - Description: Retrieves details of a specific watchlist by ID.

### Get All Watchlists
- **GET /api/watchlists**
  - Description: Retrieves a list of all watchlists.

### Update Watchlist
- **PUT /api/watchlists/:id**
  - Description: Updates details of a specific watchlist by ID.

### Delete Watchlist
- **DELETE /api/watchlists/:id**
  - Description: Deletes a specific watchlist by ID.

## Watchlist Stocks

### Add Stock to Watchlist
- **POST /api/watchlists/:watchlist_id/stocks**
  - Description: Adds a stock to a specific watchlist.

### Get Watchlist Stocks
- **GET /api/watchlists/:watchlist_id/stocks**
  - Description: Retrieves all stocks in a specific watchlist.

### Delete Stock from Watchlist
- **DELETE /api/watchlists/:watchlist_id/stocks/:id**
  - Description: Deletes a specific stock from a watchlist.

## Algorithms

### Create Algorithm
- **POST /api/algorithms**
  - Description: Creates a new algorithm.

### Get Algorithm
- **GET /api/algorithms/:id**
  - Description: Retrieves details of a specific algorithm by ID.

### Get All Algorithms
- **GET /api/algorithms**
  - Description: Retrieves a list of all algorithms.

### Update Algorithm
- **PUT /api/algorithms/:id**
  - Description: Updates details of a specific algorithm by ID.

### Delete Algorithm
- **DELETE /api/algorithms/:id**
  - Description: Deletes a specific algorithm by ID.

## Backtests

### Create Backtest
- **POST /api/backtests**
  - Description: Creates a new backtest for an algorithm.

### Get Backtest
- **GET /api/backtests/:id**
  - Description: Retrieves details of a specific backtest by ID.

### Get All Backtests
- **GET /api/backtests**
  - Description: Retrieves a list of all backtests.

### Update Backtest
- **PUT /api/backtests/:id**
  - Description: Updates details of a specific backtest by ID.

### Delete Backtest
- **DELETE /api/backtests/:id**
  - Description: Deletes a specific backtest by ID.
