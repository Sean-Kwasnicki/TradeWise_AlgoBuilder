# API Routes Outline

## Users

### Create User
- **URL:** /api/users
- **Method:** POST
- **Request Body:**
  - `username` (string): The username of the user.
  - `email` (string): The email of the user.
  - `password` (string): The password of the user.
- **Success Response:**
  - **Code:** 201 Created
  - **Content:**
    ```json
    {
      "id": 1,
      "username": "user1",
      "email": "user1@example.com",
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-19T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 400 Bad Request
  - **Content:**
    ```json
    {
      "errors": "Validation errors"
    }
    ```

### Get User
- **URL:** /api/users/:id
- **Method:** GET
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "id": 1,
      "username": "user1",
      "email": "user1@example.com",
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-19T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
  - **Content:**
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
  - **Content:**
    ```json
    {
      "errors": "User not found"
    }
    ```

### Update User
- **URL:** /api/users/:id
- **Method:** PUT
- **Request Body:**
  - `username` (string): The new username of the user.
  - `email` (string): The new email of the user.
  - `password` (string): The new password of the user.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "id": 1,
      "username": "new_user1",
      "email": "new_user1@example.com",
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-20T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
  - **Content:**
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
  - **Content:**
    ```json
    {
      "errors": "User not found"
    }
    ```

### Delete User
- **URL:** /api/users/:id
- **Method:** DELETE
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "message": "User deleted successfully"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
  - **Content:**
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
  - **Content:**
    ```json
    {
      "errors": "User not found"
    }
    ```

### Get All Users
- **URL:** /api/users
- **Method:** GET
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    [
      {
        "id": 1,
        "username": "user1",
        "email": "user1@example.com",
        "created_at": "2023-06-19T00:00:00",
        "updated_at": "2023-06-19T00:00:00"
      },
      {
        "id": 2,
        "username": "user2",
        "email": "user2@example.com",
        "created_at": "2023-06-19T00:00:00",
        "updated_at": "2023-06-19T00:00:00"
      }
    ]
    ```

## Portfolios

### Create Portfolio
- **URL:** /api/portfolios
- **Method:** POST
- **Request Body:**
  - `name` (string): The name of the portfolio.
  - `initial_balance` (number): The initial balance of the portfolio.
- **Success Response:**
  - **Code:** 201 Created
  - **Content:**
    ```json
    {
      "id": 1,
      "user_id": 1,
      "name": "Tech Stocks",
      "initial_balance": 10000.00,
      "current_value": 10000.00,
      "profit_loss": 0.00,
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-19T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 400 Bad Request
  - **Content:**
    ```json
    {
      "errors": "Validation errors"
    }
    ```

### Get Portfolio
- **URL:** /api/portfolios/:id
- **Method:** GET
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "id": 1,
      "user_id": 1,
      "name": "Tech Stocks",
      "initial_balance": 10000.00,
      "current_value": 10500.00,
      "profit_loss": 500.00,
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-20T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
  - **Content:**
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
  - **Content:**
    ```json
    {
      "errors": "Portfolio not found"
    }
    ```

### Get All Portfolios
- **URL:** /api/portfolios
- **Method:** GET
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    [
      {
        "id": 1,
        "user_id": 1,
        "name": "Tech Stocks",
        "initial_balance": 10000.00,
        "current_value": 10500.00,
        "profit_loss": 500.00,
        "created_at": "2023-06-19T00:00:00",
        "updated_at": "2023-06-20T00:00:00"
      },
      {
        "id": 2,
        "user_id": 2,
        "name": "Growth Stocks",
        "initial_balance": 15000.00,
        "current_value": 15500.00,
        "profit_loss": 500.00,
        "created_at": "2023-06-19T00:00:00",
        "updated_at": "2023-06-20T00:00:00"
      }
    ]
    ```

### Update Portfolio
- **URL:** /api/portfolios/:id
- **Method:** PUT
- **Request Body:**
  - `name` (string): The new name of the portfolio.
  - `initial_balance` (number): The new initial balance of the portfolio.
  - `current_value` (number): The new current value of the portfolio.
  - `profit_loss` (number): The new profit/loss of the portfolio.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "id": 1,
      "user_id": 1,
      "name": "Updated Tech Stocks",
      "initial_balance": 10000.00,
      "current_value": 10500.00,
      "profit_loss": 500.00,
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-20T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
  - **Content:**
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
  - **Content:**
    ```json
    {
      "errors": "Portfolio not found"
    }
    ```

### Delete Portfolio
- **URL:** /api/portfolios/:id
- **Method:** DELETE
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "message": "Portfolio deleted successfully"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
  - **Content:**
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Portfolio not found"
    }
    ```

## Portfolio Stocks

### Add Stock to Portfolio
- **URL:** /api/portfolios/:portfolio_id/stocks
- **Method:** POST
- **Request Body:**
  - `stock_id` (integer): The ID of the stock.
  - `quantity` (integer): The quantity of the stock.
  - `purchase_price` (number): The purchase price of the stock.
- **Success Response:**
  - **Code:** 201 Created
  - **Content:**
    ```json
    {
      "id": 1,
      "portfolio_id": 1,
      "stock_id": 1,
      "quantity": 10,
      "purchase_price": 150.00,
      "current_price": 150.00,
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-19T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 400 Bad Request
    ```json
    {
      "errors": "Validation errors"
    }
    ```

### Get Portfolio Stocks
- **URL:** /api/portfolios/:portfolio_id/stocks
- **Method:** GET
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    [
      {
        "id": 1,
        "portfolio_id": 1,
        "stock_id": 1,
        "quantity": 10,
        "purchase_price": 150.00,
        "current_price": 150.00,
        "created_at": "2023-06-19T00:00:00",
        "updated_at": "2023-06-19T00:00:00"
      },
      {
        "id": 2,
        "portfolio_id": 1,
        "stock_id": 2,
        "quantity": 5,
        "purchase_price": 2800.00,
        "current_price": 2800.00,
        "created_at": "2023-06-19T00:00:00",
        "updated_at": "2023-06-19T00:00:00"
      }
    ]
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Portfolio not found"
    }
    ```

### Update Portfolio Stock
- **URL:** /api/portfolios/:portfolio_id/stocks/:id
- **Method:** PUT
- **Request Body:**
  - `quantity` (integer): The new quantity of the stock.
  - `purchase_price` (number): The new purchase price of the stock.
  - `current_price` (number): The new current price of the stock.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "id": 1,
      "portfolio_id": 1,
      "stock_id": 1,
      "quantity": 20,
      "purchase_price": 150.00,
      "current_price": 150.00,
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-20T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Portfolio or stock not found"
    }
    ```

### Delete Portfolio Stock
- **URL:** /api/portfolios/:portfolio_id/stocks/:id
- **Method:** DELETE
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "message": "Stock deleted from portfolio successfully"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Portfolio or stock not found"
    }
    ```

## Stocks

### Get Stock
- **URL:** /api/stocks/:id
- **Method:** GET
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "id": 1,
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "current_price": 150.00,
      "market_cap": 2500000000,
      "pe_ratio": 30,
      "dividend_yield": 0.005,
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-19T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Stock not found"
    }
    ```

## Stock Historical Prices

### Get Historical Prices
- **URL:** /api/stocks/:stock_id/historical_prices
- **Method:** GET
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    [
      {
        "id": 1,
        "stock_id": 1,
        "date": "2023-01-01",
        "open_price": 145.00,
        "close_price": 150.00,
        "high_price": 152.00,
        "low_price": 144.00,
        "volume": 100000
      },
      {
        "id": 2,
        "stock_id": 1,
        "date": "2023-01-02",
        "open_price": 150.00,
        "close_price": 151.00,
        "high_price": 153.00,
        "low_price": 149.00,
        "volume": 120000
      }
    ]
    ```
- **Error Response:**
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Stock or historical prices not found"
    }
    ```

## Watchlists

### Create Watchlist
- **URL:** /api/watchlists
- **Method:** POST
- **Request Body:**
  - `name` (string): The name of the watchlist.
- **Success Response:**
  - **Code:** 201 Created
  - **Content:**
    ```json
    {
      "id": 1,
      "user_id": 1,
      "name": "My Watchlist",
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-19T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 400 Bad Request
    ```json
    {
      "errors": "Validation errors"
    }
    ```

### Get Watchlist
- **URL:** /api/watchlists/:id
- **Method:** GET
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "id": 1,
      "user_id": 1,
      "name": "My Watchlist",
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-19T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Watchlist not found"
    }
    ```

### Get All Watchlists
- **URL:** /api/watchlists
- **Method:** GET
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    [
      {
        "id": 1,
        "user_id": 1,
        "name": "My Watchlist",
        "created_at": "2023-06-19T00:00:00",
        "updated_at": "2023-06-19T00:00:00"
      },
      {
        "id": 2,
        "user_id": 2,
        "name": "Growth Watchlist",
        "created_at": "2023-06-19T00:00:00",
        "updated_at": "2023-06-19T00:00:00"
      }
    ]
    ```

### Update Watchlist
- **URL:** /api/watchlists/:id
- **Method:** PUT
- **Request Body:**
  - `name` (string): The new name of the watchlist.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "id": 1,
      "user_id": 1,
      "name": "Updated Watchlist",
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-20T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Watchlist not found"
    }
    ```

### Delete Watchlist
- **URL:** /api/watchlists/:id
- **Method:** DELETE
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "message": "Watchlist deleted successfully"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Watchlist not found"
    }
    ```

## Watchlist Stocks

### Add Stock to Watchlist
- **URL:** /api/watchlists/:watchlist_id/stocks
- **Method:** POST
- **Request Body:**
  - `stock_id` (integer): The ID of the stock.
- **Success Response:**
  - **Code:** 201 Created
  - **Content:**
    ```json
    {
      "id": 1,
      "watchlist_id": 1,
      "stock_id": 1,
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-19T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 400 Bad Request
    ```json
    {
      "errors": "Validation errors"
    }
    ```

### Get Watchlist Stocks
- **URL:** /api/watchlists/:watchlist_id/stocks
- **Method:** GET
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    [
      {
        "id": 1,
        "watchlist_id": 1,
        "stock_id": 1,
        "created_at": "2023-06-19T00:00:00",
        "updated_at": "2023-06-19T00:00:00"
      },
      {
        "id": 2,
        "watchlist_id": 1,
        "stock_id": 2,
        "created_at": "2023-06-19T00:00:00",
        "updated_at": "2023-06-19T00:00:00"
      }
    ]
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Watchlist not found"
    }
    ```

### Delete Stock from Watchlist
- **URL:** /api/watchlists/:watchlist_id/stocks/:id
- **Method:** DELETE
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "message": "Stock deleted from watchlist successfully"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Watchlist or stock not found"
    }
    ```

## Algorithms

### Create Algorithm
- **URL:** /api/algorithms
- **Method:** POST
- **Request Body:**
  - `name` (string): The name of the algorithm.
  - `description` (string): The description of the algorithm.
- **Success Response:**
  - **Code:** 201 Created
  - **Content:**
    ```json
    {
      "id": 1,
      "user_id": 1,
      "name": "Simple Moving Average",
      "description": "A simple moving average algorithm.",
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-19T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 400 Bad Request
    ```json
    {
      "errors": "Validation errors"
    }
    ```

### Get Algorithm
- **URL:** /api/algorithms/:id
- **Method:** GET
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "id": 1,
      "user_id": 1,
      "name": "Simple Moving Average",
      "description": "A simple moving average algorithm.",
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-19T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Algorithm not found"
    }
    ```

### Get All Algorithms
- **URL:** /api/algorithms
- **Method:** GET
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    [
      {
        "id": 1,
        "user_id": 1,
        "name": "Simple Moving Average",
        "description": "A simple moving average algorithm.",
        "created_at": "2023-06-19T00:00:00",
        "updated_at": "2023-06-19T00:00:00"
      },
      {
        "id": 2,
        "user_id": 2,
        "name": "Exponential Moving Average",
        "description": "An exponential moving average algorithm.",
        "created_at": "2023-06-19T00:00:00",
        "updated_at": "2023-06-19T00:00:00"
      }
    ]
    ```

### Update Algorithm
- **URL:** /api/algorithms/:id
- **Method:** PUT
- **Request Body:**
  - `name` (string): The new name of the algorithm.
  - `description` (string): The new description of the algorithm.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "id": 1,
      "user_id": 1,
      "name": "Updated Algorithm",
      "description": "An updated algorithm description.",
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-20T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Algorithm not found"
    }
    ```

### Delete Algorithm
- **URL:** /api/algorithms/:id
- **Method:** DELETE
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "message": "Algorithm deleted successfully"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Algorithm not found"
    }
    ```

## Backtests

### Create Backtest
- **URL:** /api/backtests
- **Method:** POST
- **Request Body:**
  - `algorithm_id` (integer): The ID of the algorithm to backtest.
  - `start_date` (string): The start date of the backtest.
  - `end_date` (string): The end date of the backtest.
  - `initial_balance` (number): The initial balance for the backtest.
  - `final_balance` (number): The final balance after the backtest.
  - `profit_loss` (number): The profit/loss after the backtest.
  - `drawdown` (number): The drawdown percentage during the backtest.
  - `roi` (number): The return on investment percentage.
- **Success Response:**
  - **Code:** 201 Created
  - **Content:**
    ```json
    {
      "id": 1,
      "algorithm_id": 1,
      "start_date": "2022-01-01",
      "end_date": "2022-12-31",
      "initial_balance": 10000.00,
      "final_balance": 10500.00,
      "profit_loss": 500.00,
      "drawdown": 2.5,
      "roi": 5.0,
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-19T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 400 Bad Request
    ```json
    {
      "errors": "Validation errors"
    }
    ```

### Get Backtest
- **URL:** /api/backtests/:id
- **Method:** GET
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "id": 1,
      "algorithm_id": 1,
      "start_date": "2022-01-01",
      "end_date": "2022-12-31",
      "initial_balance": 10000.00,
      "final_balance": 10500.00,
      "profit_loss": 500.00,
      "drawdown": 2.5,
      "roi": 5.0,
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-19T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Backtest not found"
    }
    ```

### Get All Backtests
- **URL:** /api/backtests
- **Method:** GET
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    [
      {
        "id": 1,
        "algorithm_id": 1,
        "start_date": "2022-01-01",
        "end_date": "2022-12-31",
        "initial_balance": 10000.00,
        "final_balance": 10500.00,
        "profit_loss": 500.00,
        "drawdown": 2.5,
        "roi": 5.0,
        "created_at": "2023-06-19T00:00:00",
        "updated_at": "2023-06-19T00:00:00"
      },
      {
        "id": 2,
        "algorithm_id": 2,
        "start_date": "2022-01-01",
        "end_date": "2022-12-31",
        "initial_balance": 15000.00,
        "final_balance": 15500.00,
        "profit_loss": 500.00,
        "drawdown": 3.0,
        "roi": 3.33,
        "created_at": "2023-06-19T00:00:00",
        "updated_at": "2023-06-19T00:00:00"
      }
    ]
    ```

### Update Backtest
- **URL:** /api/backtests/:id
- **Method:** PUT
- **Request Body:**
  - `start_date` (string): The new start date of the backtest.
  - `end_date` (string): The new end date of the backtest.
  - `initial_balance` (number): The new initial balance for the backtest.
  - `final_balance` (number): The new final balance after the backtest.
  - `profit_loss` (number): The new profit/loss after the backtest.
  - `drawdown` (number): The new drawdown percentage during the backtest.
  - `roi` (number): The new return on investment percentage.
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "id": 1,
      "algorithm_id": 1,
      "start_date": "2022-01-01",
      "end_date": "2022-12-31",
      "initial_balance": 10000.00,
      "final_balance": 10500.00,
      "profit_loss": 500.00,
      "drawdown": 2.5,
      "roi": 5.0,
      "created_at": "2023-06-19T00:00:00",
      "updated_at": "2023-06-20T00:00:00"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Backtest not found"
    }
    ```

### Delete Backtest
- **URL:** /api/backtests/:id
- **Method:** DELETE
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "message": "Backtest deleted successfully"
    }
    ```
- **Error Response:**
  - **Code:** 401 Unauthorized
    ```json
    {
      "errors": "Unauthorized access"
    }
    ```
  - **Code:** 404 Not Found
    ```json
    {
      "errors": "Backtest not found"
    }
    ```

