from .db import db

class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    initial_balance = db.Column(db.Numeric(15, 2), nullable=False)
    current_value = db.Column(db.Numeric(15, 2), nullable=False)
    profit_loss = db.Column(db.Numeric(15, 2), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now())

    user = db.relationship('User', back_populates='portfolios')
    stocks = db.relationship('PortfolioStock', back_populates='portfolio', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'initial_balance': str(self.initial_balance),
            'current_value': str(self.current_value),
            'profit_loss': str(self.profit_loss),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
