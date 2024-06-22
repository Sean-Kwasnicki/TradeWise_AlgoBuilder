# from app.models import db, Watchlist, Stock, WatchlistStock, environment, SCHEMA
# from sqlalchemy.sql import text

# def seed_watchlist_stocks():
#     watchlists = Watchlist.query.all()
#     stock = Stock.query.filter_by(symbol='AAPL').first()

#     if not stock:
#         print("Stock 'AAPL' not found")  # Debug print
#         return

#     if not watchlists:
#         print("No watchlists found")  # Debug print
#         return

#     for watchlist in watchlists:
#         watchlist_stock = WatchlistStock(
#             watchlist_id=watchlist.id,
#             stock_id=stock.id
#         )
#         db.session.add(watchlist_stock)
#         print(f"Added stock {stock.symbol} to watchlist {watchlist.id}")  # Debug print

#     db.session.commit()
#     print("Completed seeding Watchlist Stocks")  # Debug print

# def undo_watchlist_stocks():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM watchlist_stocks"))

#     db.session.commit()

from app.models import db, Watchlist, Stock, WatchlistStock, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlist_stocks():
    watchlists = Watchlist.query.all()
    stock_symbols = ['AAPL', 'GOOGL', 'MSFT']
    stocks = Stock.query.filter(Stock.symbol.in_(stock_symbols)).all()

    if not stocks:
        print("Stocks not found")  # Debug print
        return

    if not watchlists:
        print("No watchlists found")  # Debug print
        return

    for watchlist in watchlists:
        for stock in stocks:
            watchlist_stock = WatchlistStock(
                watchlist_id=watchlist.id,
                stock_id=stock.id
            )
            db.session.add(watchlist_stock)
            print(f"Added stock {stock.symbol} to watchlist {watchlist.id}")  # Debug print

    db.session.commit()
    print("Completed seeding Watchlist Stocks")  # Debug print

def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist_stocks"))

    db.session.commit()
