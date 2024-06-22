# seeds/stocks.py (use the updated get_stock_price function)
from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text
from app.api.yahoo_finance_client import get_stock_price
import yfinance as yf

def seed_stocks():
    stock_symbols = ['AAPL', 'GOOGL', 'MSFT']
    stocks = []

    for symbol in stock_symbols:
        ticker = yf.Ticker(symbol)
        stock_info = ticker.info
        print(f"Fetching data for {symbol}: {stock_info}")  # Debug print

        # Try multiple keys to get the current price
        current_price = stock_info.get('regularMarketPrice', None)
        if current_price is None:
            current_price = stock_info.get('ask', None)
        if current_price is None:
            current_price = stock_info.get('bid', None)

        if current_price is None:
            print(f"Could not fetch current price for {symbol}, setting to 0")
            current_price = 0  # Set a default value to avoid errors

        stocks.append(
            Stock(
                symbol=symbol,
                name=stock_info.get('shortName', f"{symbol} Inc."),
                current_price=current_price,
                market_cap=stock_info.get('marketCap', 0),
                pe_ratio=stock_info.get('trailingPE', 0),
                dividend_yield=stock_info.get('dividendYield', 0)
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
