# from app.models import db, Portfolio, Stock, PortfolioStock, environment, SCHEMA
# from sqlalchemy.sql import text

# def seed_portfolio_stocks():
#     portfolios = Portfolio.query.all()
#     stock = Stock.query.filter_by(symbol='AAPL').first()

#     if not stock:
#         print("Stock 'AAPL' not found")  # Debug print
#         return

#     if not portfolios:
#         print("No portfolios found")  # Debug print
#         return

#     for portfolio in portfolios:
#         portfolio_stock = PortfolioStock(
#             portfolio_id=portfolio.id,
#             stock_id=stock.id,
#             quantity=10,
#             purchase_price=stock.current_price,
#             current_price=stock.current_price
#         )
#         db.session.add(portfolio_stock)
#         print(f"Added stock {stock.symbol} to portfolio {portfolio.id}")  # Debug print

#     db.session.commit()
#     print("Completed seeding Portfolio Stocks")  # Debug print

# def undo_portfolio_stocks():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.portfolio_stocks RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM portfolio_stocks"))

#     db.session.commit()

# from app.models import db, Portfolio, Stock, PortfolioStock, environment, SCHEMA
# from sqlalchemy.sql import text

# def seed_portfolio_stocks():
#     portfolios = Portfolio.query.all()
#     stock_symbols = ['AAPL', 'GOOGL', 'MSFT']
#     stocks = Stock.query.filter(Stock.symbol.in_(stock_symbols)).all()

#     if not stocks:
#         print("Stocks not found")  # Debug print
#         return

#     if not portfolios:
#         print("No portfolios found")  # Debug print
#         return

#     for portfolio in portfolios:
#         for stock in stocks:
#             portfolio_stock = PortfolioStock(
#                 portfolio_id=portfolio.id,
#                 stock_id=stock.id,
#                 quantity=10,
#                 purchase_price=stock.current_price,
#                 current_price=stock.current_price
#             )
#             db.session.add(portfolio_stock)
#             print(f"Added stock {stock.symbol} to portfolio {portfolio.id}")  # Debug print

#     db.session.commit()
#     print("Completed seeding Portfolio Stocks")  # Debug print

# def undo_portfolio_stocks():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.portfolio_stocks RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM portfolio_stocks"))

#     db.session.commit()

from app.models import db, Stock, Portfolio, PortfolioStock, environment, SCHEMA
from app.api.finnhub_client import get_stock_price
from app.api.yahoo_finance_client import get_stock_details
from sqlalchemy.sql import text

def seed_stocks():
    stock_symbols = ['AAPL', 'GOOGL', 'MSFT']
    stocks = []

    for symbol in stock_symbols:
        stock_info = get_stock_price(symbol)
        stock_details = get_stock_details(symbol)
        if stock_info and stock_details:
            stocks.append(
                Stock(
                    symbol=stock_info['symbol'],
                    name=stock_info['name'],
                    current_price=stock_info['price'],
                    market_cap=stock_info['market_cap'],
                    pe_ratio=stock_info['pe_ratio'],
                    dividend_yield=stock_info['dividend_yield'],
                    volume=stock_details['volume'],
                    week_52_high=stock_details['week_52_high'],
                    week_52_low=stock_details['week_52_low'],
                    average_volume=stock_details['average_volume']
                )
            )

    db.session.bulk_save_objects(stocks)
    db.session.commit()

def seed_portfolio_stocks():
    portfolios = Portfolio.query.all()
    stocks = Stock.query.all()

    for portfolio in portfolios:
        for stock in stocks:
            stock_quantity = 1
            stock_purchase_price = stock.current_price

            # Ensure the total purchase value does not exceed the free capital
            total_purchase_value = stock_purchase_price * stock_quantity
            if total_purchase_value > portfolio.free_capital:
                continue  # Skip this stock if it exceeds the free capital

            portfolio_stock = PortfolioStock(
                portfolio_id=portfolio.id,
                 stock_symbol=stock.symbol,  # Use stock_symbol instead of stock_id
                quantity=stock_quantity,
                purchase_price=stock_purchase_price,
                current_price=stock.current_price
            )
            db.session.add(portfolio_stock)

            # Update portfolio values
            portfolio.current_value += stock.current_price * stock_quantity
            portfolio.profit_loss = portfolio.current_value - portfolio.initial_balance
            portfolio.free_capital -= total_purchase_value

    db.session.commit()

def undo_portfolio_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolio_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolio_stocks"))

    db.session.commit()
