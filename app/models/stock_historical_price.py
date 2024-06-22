from .db import db

class StockHistoricalPrice(db.Model):
    __tablename__ = 'stock_historical_prices'

    id = db.Column(db.Integer, primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey('stocks.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    open_price = db.Column(db.Numeric(15, 2), nullable=False)
    close_price = db.Column(db.Numeric(15, 2), nullable=False)
    high_price = db.Column(db.Numeric(15, 2), nullable=False)
    low_price = db.Column(db.Numeric(15, 2), nullable=False)
    volume = db.Column(db.Integer, nullable=False)

    stock = db.relationship('Stock', back_populates='historical_prices')

    def to_dict(self):
        return {
            'id': self.id,
            'stock_id': self.stock_id,
            'date': self.date,
            'open_price': str(self.open_price),
            'close_price': str(self.close_price),
            'high_price': str(self.high_price),
            'low_price': str(self.low_price),
            'volume': self.volume
        }
