from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Stock, StockHistoricalPrice
from app.api.yahoo_finance_client import get_stock_price
from app import db

stock_routes = Blueprint('stocks', __name__)

# Get Stock by ID
@stock_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_stock(id):
    stock = Stock.query.get(id)
    if stock is None:
        return jsonify({"errors": "Stock not found"}), 404
    return jsonify(stock.to_dict()), 200

# Get Stock by Symbol
@stock_routes.route('/symbol/<string:symbol>', methods=['GET'])
@login_required
def get_stock_by_symbol(symbol):
    stock = Stock.query.filter_by(symbol=symbol).first()
    if stock is None:
        return jsonify({"errors": "Stock not found"}), 404
    return jsonify(stock.to_dict()), 200

# Get Historical Prices
@stock_routes.route('/<int:stock_id>/historical_prices', methods=['GET'])
@login_required
def get_historical_prices(stock_id):
    stock = Stock.query.get(stock_id)
    if stock is None:
        return jsonify({"errors": "Stock not found"}), 404
    historical_prices = StockHistoricalPrice.query.filter_by(stock_id=stock_id).all()
    if not historical_prices:
        return jsonify({"errors": "Stock or historical prices not found"}), 404
    return jsonify([price.to_dict() for price in historical_prices]), 200

# Update Stock Price
@stock_routes.route('/update/<string:symbol>', methods=['GET'])
@login_required
def update_stock(symbol):
    stock_data = get_stock_price(symbol)
    if stock_data is None:
        return jsonify({"errors": "Failed to fetch stock data"}), 400

    stock = Stock.query.filter_by(symbol=symbol).first()
    if stock is None:
        return jsonify({"errors": "Stock not found"}), 404

    stock.current_price = stock_data['price']
    stock.market_cap = stock_data.get('market_cap', stock.market_cap)
    stock.pe_ratio = stock_data.get('pe_ratio', stock.pe_ratio)
    stock.dividend_yield = stock_data.get('dividend_yield', stock.dividend_yield)
    db.session.commit()

    return jsonify(stock.to_dict()), 200

# Get All Stocks
@stock_routes.route('/', methods=['GET'])
@login_required
def get_all_stocks():
    stocks = Stock.query.all()
    return jsonify([stock.to_dict() for stock in stocks]), 200
