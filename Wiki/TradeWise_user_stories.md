# User Stories for TradeWise Algorithm Building Site

## Portfolio

### View Portfolio
- **User Story**: As a user, I want to view my portfolio so that I can see an overview of all the stocks I own and their performance.
- **Details**:
  - Given I am logged in, when I navigate to the portfolio page, I should see a list of all the portfolios I have created.
  - Each portfolio should display the name, total value, and a summary of stocks within it.
  - The summary should include the stock symbols, current prices, quantities held, total value of each stock, and percentage change.
  - There should be an option to view detailed information about each portfolio, including a historical performance chart and a breakdown of gains and losses.
  - I should be able to toggle between different views (e.g., list view, chart view) to better understand my portfolio performance.
  - I should see notifications about significant changes in my portfolio value.

### Create Portfolio
- **User Story**: As a user, I want to create a new portfolio so that I can start tracking new investments.
- **Details**:
  - Given I am logged in, when I navigate to the portfolio creation page, I should see a form to create a new portfolio.
  - The form should allow me to input a portfolio name and an initial balance (fake money).
  - When I submit the form with valid data, a new portfolio should be created and added to my list of portfolios.
  - I should receive a confirmation message that the portfolio was created successfully.
  - The new portfolio should initially be empty but allow for adding stocks.
  - I should be able to set an investment goal or target for the portfolio.

### Update Portfolio
- **User Story**: As a user, I want to update my portfolio to add more fake money for simulation purposes.
- **Details**:
  - Given I am logged in and on the portfolio page, when I click on a portfolio, I should see an option to add funds.
  - The option should allow me to input an amount of money to add to the portfolio.
  - When I submit the form, the portfolio's total value should be updated accordingly.
  - I should receive a confirmation message that the funds were added successfully.
  - The added funds should be reflected in the total value of the portfolio and in the portfolio's historical performance chart.
  - I should be able to set a reason or note for adding funds to track changes over time.

### Delete Portfolio
- **User Story**: As a user, I want to delete my portfolio to remove investments I no longer want to track.
- **Details**:
  - Given I am logged in and on the portfolio page, when I click on a portfolio, I should see an option to delete it.
  - When I confirm the deletion, the portfolio should be removed from my list of portfolios.
  - I should receive a confirmation message that the portfolio was deleted successfully.
  - The deletion should not affect any other portfolios I have, and I should be able to undo the deletion within a certain time frame.
  - A confirmation modal should display detailed information about what will happen if I delete the portfolio, including the impact on my overall investments.

## Stock Details

### View Stock Details
- **User Story**: As a user, I want to view details of selected stocks to make informed investment decisions.
- **Details**:
  - Given I am logged in and on the research page, when I search for a stock, I should see detailed information about the stock.
  - The stock details should include the current price, historical prices, volume, market cap, PE ratio, dividend yield, and recent news.
  - The historical prices should be displayed in an interactive chart with options to view different time ranges (1 day, 1 week, 1 month, 1 year, 5 years).
  - The stock details page should allow me to view real-time updates and set price alerts.
  - I should be able to see analyst ratings, target prices, and earnings reports.

### Purchase Stocks
- **User Story**: As a user, I want to purchase stocks to add them to my portfolio.
- **Details**:
  - Given I am logged in and viewing a stock's details, I should see an option to purchase the stock.
  - The option should allow me to input the number of shares I want to buy and select the portfolio to add them to.
  - When I submit the purchase, the stock should be added to the selected portfolio.
  - The portfolio's total value should be updated accordingly.
  - I should receive a confirmation message that the stock was purchased successfully.
  - The transaction should be logged in the portfolio's transaction history.

### Update Stock Purchase
- **User Story**: As a user, I want to update the amount of stocks I want to purchase to adjust my investments.
- **Details**:
  - Given I am logged in and viewing a stock's details, I should see an option to update the number of shares I want to purchase.
  - The option should allow me to input a new number of shares and update the portfolio accordingly.
  - When I submit the update, the stock quantity in the portfolio should be updated.
  - I should receive a confirmation message that the stock purchase was updated successfully.
  - The portfolio's total value should reflect the updated stock quantity, and the transaction should be logged.

### Delete Stock Order
- **User Story**: As a user, I want to delete stocks from my order if I change my mind.
- **Details**:
  - Given I am logged in and viewing a stock's details, I should see an option to delete the stock from my order.
  - When I confirm the deletion, the stock should be removed from the portfolio.
  - The portfolio's total value should be updated accordingly.
  - I should receive a confirmation message that the stock was deleted successfully.
  - The deletion should not affect other stocks in the portfolio, and the transaction should be logged.

## Watchlist

### View Watchlist
- **User Story**: As a user, I want to view all of my watched stocks to keep track of stocks I am interested in.
- **Details**:
  - Given I am logged in, when I navigate to the watchlist page, I should see a list of all the stocks I have added to my watchlist.
  - Each stock should display the symbol, current price, recent price changes, and any recent news.
  - There should be an option to view detailed information about each stock in the watchlist, similar to the stock details page.
  - I should be able to set price alerts and notifications for stocks in my watchlist.

### Add to Watchlist
- **User Story**: As a user, I want to add a stock to my watchlist to monitor its performance.
- **Details**:
  - Given I am logged in and viewing a stock's details, I should see an option to add the stock to my watchlist.
  - When I click the add button, the stock should be added to my watchlist.
  - I should receive a confirmation message that the stock was added to my watchlist.
  - The added stock should be visible in my watchlist with real-time updates and news.
  - I should be able to add notes or tags to the stock for better organization.

### Remove from Watchlist
- **User Story**: As a user, I want to remove a stock from my watchlist if I am no longer interested in it.
- **Details**:
  - Given I am logged in and on the watchlist page, I should see an option to remove each stock from my watchlist.
  - When I click the remove button and confirm, the stock should be removed from my watchlist.
  - I should receive a confirmation message that the stock was removed from my watchlist.
  - The removal should not affect other stocks in the watchlist, and I should be able to undo the removal within a certain time frame.
  - I should be able to set a reason or note for removing the stock for tracking purposes.

### Create Multiple Watchlists
- **User Story**: As a user, I want to create multiple watchlists to organize my watched stocks by category.
- **Details**:
  - Given I am logged in, I should see an option to create a new watchlist.
  - The option should allow me to input a watchlist name and category.
  - When I submit the form, a new watchlist should be created and added to my list of watchlists.
  - I should receive a confirmation message that the watchlist was created successfully.
  - The new watchlist should initially be empty but allow for adding stocks, with options to filter and sort the stocks within the watchlist.
  - I should be able to move stocks between watchlists.

## Search

### Search Stocks
- **User Story**: As a user, I want to search for a stock by name to find specific investment opportunities.
- **Details**:
  - Given I am logged in, when I navigate to the search page, I should see a search bar to input the stock name.
  - When I enter a stock name and click search, I should see a list of search results matching the input.
  - Each result should display the stock symbol, name, current price, and a brief summary.
  - There should be an option to view detailed information about each stock in the search results, with an indication of which stocks are already in my watchlist or portfolio.
  - The search should handle partial matches and display a "no results found" message if applicable.

### View Search Results
- **User Story**: As a user, I want to view the results of my search to see details of the stocks I am interested in.
- **Details**:
  - Given I am logged in and have performed a search, I should see a list of search results.
  - Each search result should display the stock symbol, name, current price, and a brief summary.
  - There should be an option to view detailed information about each stock in the search results.
  - The detailed view should include current price, historical prices, volume, market cap, PE ratio, dividend yield, and recent news.
  - I should be able to sort the search results by criteria such as price, market cap, and volume.
  - I should be able to filter the results by sector, industry, or other relevant categories.
  - There should be an option to add stocks from the search results to my portfolio or watchlist.

## Algorithm Library

### View Algorithm Library
- **User Story**: As a user, I want to view my algorithm library to manage and review my custom trading algorithms.
- **Details**:
  - Given I am logged in, when I navigate to the algorithm library page, I should see a list of all the algorithms I have created.
  - Each algorithm should display the name, description, and creation date.
  - There should be an option to view detailed information about each algorithm, including its structure and performance metrics.
  - The detailed view should show the algorithm's blocks, parameters, and any backtesting results.

### Add Algorithm to Library
- **User Story**: As a user, I want to add a new algorithm to my library to expand my trading strategies.
- **Details**:
  - Given I am logged in, when I navigate to the algorithm builder page, I should see an option to create a new algorithm.
  - The option should allow me to input a name and description for the algorithm.
  - When I submit the form, the new algorithm should be added to my algorithm library.
  - I should receive a confirmation message that the algorithm was added successfully.
  - The new algorithm should be visible in my library with options to view, edit, or delete it.

### Update Algorithm
- **User Story**: As a user, I want to update an existing algorithm to improve its performance or adjust its parameters.
- **Details**:
  - Given I am logged in and on the algorithm library page, I should see an option to edit each algorithm.
  - The option should allow me to modify the name, description, and structure of the algorithm.
  - When I submit the changes, the algorithm should be updated in my library.
  - I should receive a confirmation message that the algorithm was updated successfully.
  - The updated algorithm should reflect the changes and be available for backtesting or export.

### Delete Algorithm
- **User Story**: As a user, I want to delete an algorithm from my library if it is no longer useful.
- **Details**:
  - Given I am logged in and on the algorithm library page, I should see an option to delete each algorithm.
  - When I click the delete button and confirm, the algorithm should be removed from my library.
  - I should receive a confirmation message that the algorithm was deleted successfully.
  - The deletion should not affect other algorithms in my library, and I should be able to undo the deletion within a certain time frame.

## Algorithm Builder (Bonus Feature)

### Build Custom Algorithms
- **User Story**: As a user, I want to build custom trading algorithms using drag-and-drop blocks.
- **Details**:
  - Given I am logged in and on the algorithm builder page, I should see a canvas area for building algorithms.
  - I should see a palette of available blocks representing different technical indicators and actions.
  - I should be able to drag and drop blocks onto the canvas to create an algorithm.
  - Each block should have configurable parameters, such as indicator settings and thresholds.
  - I should see real-time feedback on the algorithm structure and potential issues.
  - There should be an option to save the algorithm to my library.

### Backtest Algorithms
- **User Story**: As a user, I want to backtest my algorithms using historical data to evaluate their performance.
- **Details**:
  - Given I am logged in and have built an algorithm, I should see an option to backtest it.
  - I should be able to select the historical data range for the backtest.
  - When I run the backtest, I should see a detailed report of the algorithm's performance, including profit/loss, drawdown, and ROI.
  - The backtest results should be displayed in a clear and interactive manner, with charts and tables.
  - I should be able to save the backtest results for future reference and comparison.

### Save and Load Algorithms
- **User Story**: As a user, I want to save my custom algorithms to reuse and refine them later.
- **Details**:
  - Given I am logged in, I should see options to save and load algorithms on the algorithm builder page.
  - I should be able to save an algorithm with a unique name and description.
  - Saved algorithms should be listed in my algorithm library, with options to view, edit, or delete them.
  - I should be able to load a saved algorithm onto the canvas for further editing or backtesting.

### Export Algorithms
- **User Story**: As a user, I want to export my custom algorithms to use them with external trading platforms.
- **Details**:
  - Given I am logged in and have built an algorithm, I should see an option to export it.
  - The export should generate code compatible with the Interactive Brokers API or other supported platforms.
  - I should be able to download the generated code as a file or copy it to the clipboard.
  - The export process should include instructions on how to integrate the algorithm with the external platform.
