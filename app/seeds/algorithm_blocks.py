from app.models import db, Algorithm, AlgorithmBlock, environment, SCHEMA
from sqlalchemy.sql import text

def seed_algorithm_blocks():
    algorithms = Algorithm.query.all()
    for algorithm in algorithms:
        algorithm_block = AlgorithmBlock(
            algorithm_id=algorithm.id,
            technical_indicator_type='SMA',
            parameters={"period": 20},
            block_order=1
        )
        db.session.add(algorithm_block)
    db.session.commit()

def undo_algorithm_blocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.algorithm_blocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM algorithm_blocks"))

    db.session.commit()
