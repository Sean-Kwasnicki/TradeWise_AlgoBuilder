from .db import db

class Stock(db.Model):
    __tablename__ = 'stocks'

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    current_price = db.Column(db.Numeric(15, 2), nullable=False)
    market_cap = db.Column(db.Numeric(20, 2), nullable=False)
    pe_ratio = db.Column(db.Numeric(10, 2), nullable=False)
    dividend_yield = db.Column(db.Numeric(5, 2), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now())

    portfolio_stocks = db.relationship('PortfolioStock', back_populates='stock')
    historical_prices = db.relationship('StockHistoricalPrice', back_populates='stock', cascade='all, delete-orphan')
    watchlist_stocks = db.relationship('WatchlistStock', back_populates='stock')

    def to_dict(self):
        return {
            'id': self.id,
            'symbol': self.symbol,
            'name': self.name,
            'current_price': str(self.current_price),
            'market_cap': str(self.market_cap),
            'pe_ratio': str(self.pe_ratio),
            'dividend_yield': str(self.dividend_yield),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
