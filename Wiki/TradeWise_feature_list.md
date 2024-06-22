
# Feature List for TradeWise Algorithm Building Site

## Home Page
- Display company name and motto.
- Show mission statement.
- Brief introduction to site features.
- Quick links to main sections.
- Quick reference videos for new users to learn the site

## Portfolio

### View Portfolio
- Users should be able to view their portfolio.
- Users should be able to see an overview of all the stocks they own, including current prices, quantities held, total value, and percentage change.
- Users should be able to view detailed information about each portfolio, including a historical performance chart.
- Users should see notifications about significant changes in their portfolio value.

### Create Portfolio
- Users should be able to create a new portfolio.
- Users should be able to input a portfolio name and an initial balance (fake money).
- Users should receive a confirmation message that the portfolio was created successfully.
- The new portfolio should initially be empty but allow for adding stocks.

### Update Portfolio
- Users should be able to update their portfolio (add fake money).
- Users should be able to input an amount of money to add to the portfolio.
- The portfolio's total value should be updated accordingly, and a confirmation message should be received.
- Users should be able to set a reason or note for adding funds to track changes over time.

### Delete Portfolio
- Users should be able to delete their portfolio.
- Users should be able to confirm the deletion and receive a confirmation message.
- The portfolio should be removed from the user's list of portfolios.

## Stock Details

### View Stock Details
- Users should be able to view details of selected stocks.
- Users should be able to see the current price, historical prices, volume, market cap, PE ratio, dividend yield, and recent news.
- Users should be able to view historical prices in an interactive chart with options to view different time ranges (1 day, 1 week, 1 month, 1 year, 5 years).
- Users should be able to see real-time updates and set price alerts.

### Purchase Stocks
- Users should be able to purchase stocks and add them to their portfolio.
- Users should be able to input the number of shares they want to buy and select the portfolio to add them to.
- Users should receive a confirmation message that the stock was purchased successfully.
- The portfolio's total value should be updated accordingly.

### Update Stock Purchase
- Users should be able to update the amount of stocks they want to purchase.
- Users should be able to input a new number of shares and update the portfolio accordingly.
- Users should receive a confirmation message that the stock purchase was updated successfully.
- The portfolio's total value should reflect the updated stock quantity.

### Delete Stock Order
- Users should be able to delete stocks from their order.
- Users should be able to confirm the deletion and receive a confirmation message.
- The stock should be removed from the portfolio, and the portfolio's total value should be updated accordingly.

## Watchlist

### View Watchlist
- Users should be able to view all of their watched stocks.
- Users should see a list of all the stocks they have added to their watchlist, including the symbol, current price, and recent news.

### Add to Watchlist
- Users should be able to add a stock to their watchlist.
- Users should be able to confirm the addition and receive a confirmation message.
- The added stock should be visible in their watchlist with real-time updates and news.

### Remove from Watchlist
- Users should be able to remove a stock from their watchlist.
- Users should be able to confirm the removal and receive a confirmation message.
- The stock should be removed from their watchlist.

### Create Multiple Watchlists
- Users should be able to create multiple watchlists to organize their watched stocks by category.
- Users should be able to input a watchlist name and category.
- Users should receive a confirmation message that the watchlist was created successfully.
- The new watchlist should initially be empty but allow for adding stocks.
- Users should be able to move stocks between watchlists.

## Search

### Search Stocks
- Users should be able to search for a stock by name.
- Users should see a list of search results matching the input, each displaying the stock symbol, name, current price, and a brief summary.
- Users should be able to view detailed information about each stock in the search results.
- The search should handle partial matches and display a "no results found" message if applicable.

### View Search Results
- Users should be able to view the results of their search to see details of the stocks they are interested in.
- Users should see detailed information about each stock in the search results, including current price, historical prices, volume, market cap, PE ratio, dividend yield, and recent news.
- Users should be able to click on a stock to view more detailed information.
- The search results should be sortable by criteria such as price, market cap, and volume.
- Users should be able to filter the results by sector, industry, or other relevant categories.

## Algorithm Library (Bonus Feature)

### View Algorithm Library
- Users should be able to view their algorithm library.
- Users should see a list of all the algorithms they have created, including the name and description of each algorithm.
- Users should be able to view detailed information about each algorithm, including its structure and performance metrics.

### Add Algorithm to Library
- Users should be able to add a new algorithm to their library.
- Users should be able to input a name and description for the algorithm.
- Users should receive a confirmation message that the algorithm was added to their library successfully.
- The new algorithm should be visible in their algorithm library.

### Update Algorithm
- Users should be able to update an existing algorithm in their library.
- Users should be able to modify the name, description, and structure of the algorithm.
- Users should receive a confirmation message that the algorithm was updated successfully.
- The updated algorithm should be reflected in their algorithm library.

### Delete Algorithm
- Users should be able to delete an algorithm from their library.
- Users should be able to confirm the deletion and receive a confirmation message.
- The algorithm should be removed from their library.

## Algorithm Builder (Bonus Feature)

### Build Custom Algorithms
- Users should be able to build custom trading algorithms using drag-and-drop blocks.
- Users should see a canvas area for building algorithms.
- Users should see a palette of available blocks representing different technical indicators and actions.
- Users should be able to drag and drop blocks onto the canvas to create an algorithm.
- Each block should have configurable parameters, such as indicator settings and thresholds.
- Users should see real-time feedback on the algorithm structure and potential issues.

### Backtest Algorithms
- Users should be able to backtest their algorithms using historical data to evaluate their performance.
- Users should see an option to select the historical data range for the backtest.
- When users run the backtest, they should see a detailed report of the algorithm's performance, including profit/loss, drawdown, and ROI.
- The backtest results should be displayed in a clear and interactive manner, with charts and tables.
- Users should be able to save the backtest results for future reference and comparison.

### Save and Load Algorithms
- Users should be able to save their custom algorithms to reuse and refine them later.
- Users should see options to save and load algorithms on the algorithm builder page.
- Users should be able to save an algorithm with a unique name and description.
- Saved algorithms should be listed in the user's algorithm library, with options to view, edit, or delete them.
- Users should be able to load a saved algorithm onto the canvas for further editing or backtesting.

### Export Algorithms
- Users should be able to export their custom algorithms to use them with external trading platforms.
- Users should see an option to export the algorithm.
- The export should generate code compatible with the Interactive Brokers API or other supported platforms.
- Users should be able to download the generated code as a file or copy it to the clipboard.
- The export process should include instructions on how to integrate the algorithm with the external platform.
