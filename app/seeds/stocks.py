
from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text
from app.api.finnhub_client import get_stock_price, get_stock_details
from app.api.yahoo_finance_client import get_stock_volume

def seed_stocks():
    stock_symbols = ['AAPL', 'GOOGL', 'MSFT']
    stocks = []

    for symbol in stock_symbols:
        stock_info = get_stock_price(symbol)
        stock_details = get_stock_details(symbol)
        volume_data= get_stock_volume(symbol)

         # Extract the volume from the dictionary
        volume = volume_data['volume'] if 'volume' in volume_data else None
        
        if stock_info and stock_details and volume:
            stocks.append(
                Stock(
                    symbol=stock_info['symbol'],
                    name=stock_info['name'],
                    current_price=stock_info['price'],
                    market_cap=stock_info['market_cap'],
                    pe_ratio=stock_info['pe_ratio'],
                    dividend_yield=stock_info['dividend_yield'],
                    volume=volume,
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
