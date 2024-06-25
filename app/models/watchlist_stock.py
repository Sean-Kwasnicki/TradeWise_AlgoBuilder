from .db import db

class WatchlistStock(db.Model):
    __tablename__ = 'watchlist_stocks'

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey('watchlists.id'), nullable=False)
    stock_symbol = db.Column(db.String(10), nullable=False)  # Use stock symbol instead of stock ID
    current_price = db.Column(db.Numeric(15, 2), nullable=False)  # Add current price field
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now())

    watchlist = db.relationship('Watchlist', back_populates='stocks')

    def to_dict(self):
        return {
            'id': self.id,
            'watchlist_id': self.watchlist_id,
            'stock_symbol': self.stock_symbol,
            'current_price': str(self.current_price),  # Include current price in to_dict
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
