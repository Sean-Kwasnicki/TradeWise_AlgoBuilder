from app.models import db, Stock, StockHistoricalPrice, environment, SCHEMA
from sqlalchemy.sql import text
from app.api.yahoo_finance_client import get_historical_prices  
from datetime import datetime

def seed_stock_historical_prices():
    stocks = Stock.query.all()
    for stock in stocks:
        historical_prices = get_historical_prices(stock.symbol)
        if historical_prices:
            for date_str, price_data in historical_prices.items():
                date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
                historical_price = StockHistoricalPrice(
                    stock_symbol=stock.symbol,
                    date=date_obj,
                    open_price=price_data['1. open'],
                    close_price=price_data['4. close'],
                    high_price=price_data['2. high'],
                    low_price=price_data['3. low'],
                    volume=price_data['5. volume']
                )
                db.session.add(historical_price)
    db.session.commit()

def undo_stock_historical_prices():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stock_historical_prices RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stock_historical_prices"))

    db.session.commit()
