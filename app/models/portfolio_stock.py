from .db import db

class PortfolioStock(db.Model):
    __tablename__ = 'portfolio_stocks'

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolios.id'), nullable=False)
    stock_symbol = db.Column(db.String(10), nullable=False)  # Use stock symbol instead of stock ID
    quantity = db.Column(db.Integer, nullable=False)
    purchase_price = db.Column(db.Numeric(15, 2), nullable=False)
    current_price = db.Column(db.Numeric(15, 2), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now())

    portfolio = db.relationship('Portfolio', back_populates='stocks')

    def to_dict(self):
        return {
            'id': self.id,
            'portfolio_id': self.portfolio_id,
            'stock_symbol': self.stock_symbol,
            'quantity': self.quantity,
            'purchase_price': str(self.purchase_price),
            'current_price': str(self.current_price),
            'value_at_purchase': str(self.purchase_price * self.quantity),
            'current_value': str(self.current_price * self.quantity),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
