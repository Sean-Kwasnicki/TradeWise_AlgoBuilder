from app.models import db, Portfolio, Stock, PortfolioStock, environment, SCHEMA
from sqlalchemy.sql import text

def seed_portfolio_stocks():
    portfolios = Portfolio.query.all()
    stock = Stock.query.filter_by(symbol='AAPL').first()

    if not stock:
        print("Stock 'AAPL' not found")  # Debug print
        return

    if not portfolios:
        print("No portfolios found")  # Debug print
        return

    for portfolio in portfolios:
        portfolio_stock = PortfolioStock(
            portfolio_id=portfolio.id,
            stock_id=stock.id,
            quantity=10,
            purchase_price=stock.current_price,
            current_price=stock.current_price
        )
        db.session.add(portfolio_stock)
        print(f"Added stock {stock.symbol} to portfolio {portfolio.id}")  # Debug print

    db.session.commit()
    print("Completed seeding Portfolio Stocks")  # Debug print

def undo_portfolio_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolio_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolio_stocks"))

    db.session.commit()
