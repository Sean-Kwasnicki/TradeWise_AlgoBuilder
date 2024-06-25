# # seeds/stocks.py (use the updated get_stock_price function)
# from app.models import db, Stock, environment, SCHEMA
# from sqlalchemy.sql import text
# from app.api.yahoo_finance_client import get_stock_price
# import yfinance as yf

# def seed_stocks():
#     stock_symbols = ['AAPL', 'GOOGL', 'MSFT']
#     stocks = []

#     for symbol in stock_symbols:
#         ticker = yf.Ticker(symbol)
#         stock_info = ticker.info
#         print(f"Fetching data for {symbol}: {stock_info}")  # Debug print

#         # Try multiple keys to get the current price
#         current_price = stock_info.get('regularMarketPrice', None)
#         if current_price is None:
#             current_price = stock_info.get('ask', None)
#         if current_price is None:
#             current_price = stock_info.get('bid', None)

#         if current_price is None:
#             print(f"Could not fetch current price for {symbol}, setting to 0")
#             current_price = 0  # Set a default value to avoid errors

#         stocks.append(
#             Stock(
#                 symbol=symbol,
#                 name=stock_info.get('shortName', f"{symbol} Inc."),
#                 current_price=current_price,
#                 market_cap=stock_info.get('marketCap', 0),
#                 pe_ratio=stock_info.get('trailingPE', 0),
#                 dividend_yield=stock_info.get('dividendYield', 0)
#             )
#         )

#     db.session.bulk_save_objects(stocks)
#     db.session.commit()


# def undo_stocks():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM stocks"))

#     db.session.commit()

from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text
from app.api.finnhub_client import get_stock_price
from app.api.yahoo_finance_client import get_stock_details

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

def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))

    db.session.commit()
