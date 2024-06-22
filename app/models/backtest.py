from .db import db

class Backtest(db.Model):
    __tablename__ = 'backtests'

    id = db.Column(db.Integer, primary_key=True)
    algorithm_id = db.Column(db.Integer, db.ForeignKey('algorithms.id'), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    initial_balance = db.Column(db.Numeric(15, 2), nullable=False)
    final_balance = db.Column(db.Numeric(15, 2), nullable=False)
    profit_loss = db.Column(db.Numeric(15, 2), nullable=False)
    drawdown = db.Column(db.Numeric(10, 2), nullable=False)
    roi = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now())

    algorithm = db.relationship('Algorithm', back_populates='backtests')

    def to_dict(self):
        return {
            'id': self.id,
            'algorithm_id': self.algorithm_id,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'initial_balance': str(self.initial_balance),
            'final_balance': str(self.final_balance),
            'profit_loss': str(self.profit_loss),
            'drawdown': str(self.drawdown),
            'roi': str(self.roi),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
