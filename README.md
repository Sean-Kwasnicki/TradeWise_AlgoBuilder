Welcome to the TradeWise_AlgoBuilder.

TradeWise is an innovative financial technology platform designed to empower users with comprehensive tools for stock research, portfolio management, and investment analysis. The website offers a wide range of features that cater to both novice investors and seasoned traders, providing them with the necessary resources to make informed financial decisions.

Key Features and User Capabilities

Stock Research:

Detailed Stock Information: Users can access in-depth details about various stocks.

Historical Data: The platform provides historical price data, allowing users to analyze the performance of stocks over time and calculate percentage gains or losses.

Real-Time Data: Integration with the TradingView widget ensures that users receive up-to-date information and real-time stock charts for precise market analysis.

Stock News: A dedicated section for stock news keeps users informed about the latest market trends, company announcements, and other relevant financial news.

Portfolio Management:

Create and Manage Portfolios: Users can create multiple portfolios to organize and manage their investments efficiently. Each portfolio can track the performance of individual stocks and overall portfolio value.

Add and Update Stocks: The platform allows users to add stocks to their portfolios with details like quantity and purchase price. Users can also update stock information to reflect changes in their investment strategy.

Performance Metrics: TradeWise calculates key performance metrics such as current portfolio value, purchase value, profit/loss, and percentage gain/loss, providing users with a clear view of their investment performance.

Watchlist Management:

Create and Manage Watchlists: Users can create and manage watchlists to monitor stocks they are interested in. This feature helps users keep an eye on potential investment opportunities.

Add Stocks to Watchlists: Users can easily add stocks to their watchlists, enabling quick access to real-time data and performance analysis for those stocks.

User-Friendly Interface:

Intuitive Design: TradeWise boasts a user-friendly interface with a clean and organized layout, making it easy for users to navigate and access the features they need.

TradeWise is designed to be a one-stop solution for investors looking to enhance their stock research and portfolio management capabilities. By offering detailed stock information, real-time data, comprehensive portfolio tracking, and a user-friendly interface, TradeWise empowers users to make informed investment decisions and achieve their financial goals.



## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.
