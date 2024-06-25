from app.models import db, Watchlist, WatchlistStock, environment, SCHEMA
from app.api.finnhub_client import get_stock_price
from sqlalchemy.sql import text

def seed_watchlist_stocks():
    watchlists = Watchlist.query.all()
    stock_symbols = ['AAPL', 'GOOGL', 'MSFT']

    for watchlist in watchlists:
        for symbol in stock_symbols:
            stock_price_info = get_stock_price(symbol)
            if not stock_price_info:
                print(f"Failed to fetch stock price for symbol: {symbol}")
                continue

            current_price = stock_price_info.get('price')
            if current_price is None:
                print(f"Failed to retrieve current price for symbol: {symbol}")
                continue

            watchlist_stock = WatchlistStock(
                watchlist_id=watchlist.id,
                stock_symbol=symbol,
                current_price=current_price  # Set the current price
            )
            db.session.add(watchlist_stock)
            print(f"Added stock {symbol} with price {current_price} to watchlist {watchlist.id}")  # Debug print

    db.session.commit()
    print("Completed seeding Watchlist Stocks")  # Debug print

def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist_stocks"))

    db.session.commit()
