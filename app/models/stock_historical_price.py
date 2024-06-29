from .db import db

class StockHistoricalPrice(db.Model):
    __tablename__ = 'stock_historical_prices'

    id = db.Column(db.Integer, primary_key=True)
    stock_symbol = db.Column(db.String(10), nullable=False)
    date = db.Column(db.Date, nullable=False)
    open_price = db.Column(db.Numeric(15, 2), nullable=False)
    close_price = db.Column(db.Numeric(15, 2), nullable=False)
    high_price = db.Column(db.Numeric(15, 2), nullable=False)
    low_price = db.Column(db.Numeric(15, 2), nullable=False)
    # volume = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'stock_symbol': self.stock_symbol,
            'date': self.date,
            'open_price': str(self.open_price),
            'close_price': str(self.close_price),
            'high_price': str(self.high_price),
            'low_price': str(self.low_price),
            # 'volume': self.volume
        }
