from app.models import db, Portfolio, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_portfolios():
    users = User.query.all()
    for user in users:
        portfolio = Portfolio(
            user_id=user.id,
            name=f'{user.username} Portfolio',
            initial_balance=10000.00,
            current_value=10000.00,
            profit_loss=0.00
        )
        db.session.add(portfolio)
    db.session.commit()

def undo_portfolios():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolios RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolios"))

    db.session.commit()
