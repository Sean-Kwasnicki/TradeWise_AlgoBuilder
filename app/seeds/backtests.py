from app.models import db, Backtest, Algorithm, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_backtests():
    algorithms = Algorithm.query.all()
    for algorithm in algorithms:
        backtest = Backtest(
            algorithm_id=algorithm.id,
            start_date=date(2023, 1, 1),
            end_date=date(2023, 12, 31),
            initial_balance=10000.00,
            final_balance=10500.00,
            profit_loss=500.00,
            drawdown=2.5,
            roi=5.0
        )
        db.session.add(backtest)
    db.session.commit()

def undo_backtests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.backtests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM backtests"))

    db.session.commit()
