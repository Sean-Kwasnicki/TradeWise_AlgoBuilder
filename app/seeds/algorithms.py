from app.models import db, Algorithm, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_algorithms():
    users = User.query.all()
    for user in users:
        algorithm = Algorithm(
            user_id=user.id,
            name=f'{user.username} Algorithm',
            description='A sample algorithm'
        )
        db.session.add(algorithm)
    db.session.commit()

def undo_algorithms():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.algorithms RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM algorithms"))

    db.session.commit()
