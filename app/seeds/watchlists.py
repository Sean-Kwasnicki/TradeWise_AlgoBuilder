from app.models import db, Watchlist, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_watchlists():
    users = User.query.all()
    for user in users:
        watchlist = Watchlist(
            user_id=user.id,
            name=f'{user.username} Watchlist'
        )
        db.session.add(watchlist)
    db.session.commit()

def undo_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
