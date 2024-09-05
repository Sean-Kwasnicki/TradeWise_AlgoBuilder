from app.models import db, Watchlist, WatchlistStock, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlist_stocks():
    watchlists = Watchlist.query.all()
    stock_symbols = ['AAPL', 'GOOGL', 'MSFT']

    for watchlist in watchlists:
        for symbol in stock_symbols:
            watchlist_stock = WatchlistStock(
                watchlist_id=watchlist.id,
                stock_symbol=symbol,
                # current_price=current_price
            )
            db.session.add(watchlist_stock)


    db.session.commit()


def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist_stocks"))

    db.session.commit()
