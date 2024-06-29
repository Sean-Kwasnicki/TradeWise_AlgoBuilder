from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.api.finnhub_client import get_stock_price, get_stock_details, get_historical_prices
from app.api.yahoo_finance_client import get_stock_volume

stock_routes = Blueprint('stocks', __name__)


looked_up_symbols = ['AAPL', 'GOOGL', 'MSFT']

# Get Stock by Symbol
@stock_routes.route('/symbol/<string:symbol>', methods=['GET'])
@login_required
def get_stock_by_symbol(symbol):
    stock_data = get_stock_price(symbol)
    stock_details = get_stock_details(symbol)
    volume=get_stock_volume(symbol)
    if stock_data is None or stock_details is None:
        return jsonify({"errors": "Failed to fetch stock data"}), 404

    stock_response = {
        'symbol': stock_data['symbol'],
        'name': stock_data['name'],
        'current_price': stock_data['price'],
        'market_cap': stock_data['market_cap'],
        'pe_ratio': stock_data['pe_ratio'],
        'dividend_yield': stock_data['dividend_yield'],
        'volume': volume,
        'week_52_high': stock_details['week_52_high'],
        'week_52_low': stock_details['week_52_low'],
        'average_volume': stock_details['average_volume']
    }

    # Add the symbol to the looked-up list if not already present
    if symbol not in looked_up_symbols:
        looked_up_symbols.append(symbol)

    return jsonify(stock_response), 200

# Get Historical Prices by Symbol
@stock_routes.route('/symbol/<string:symbol>/historical_prices', methods=['GET'])
@login_required
def get_historical_prices_by_symbol(symbol):
    historical_prices = get_historical_prices(symbol)
    if historical_prices is None:
        return jsonify({"errors": "Failed to fetch historical prices"}), 404
    return jsonify(historical_prices), 200

# Update Stock Price
@stock_routes.route('/update/<string:symbol>', methods=['GET'])
@login_required
def update_stock(symbol):
    stock_data = get_stock_price(symbol)
    if stock_data is None:
        return jsonify({"errors": "Failed to fetch stock data"}), 400

    stock_details = get_stock_details(symbol)
    if stock_details is None:
        return jsonify({"errors": "Failed to fetch stock details"}), 400

    volume=get_stock_volume(symbol)

    stock_response = {
        'symbol': stock_data['symbol'],
        'name': stock_data['name'],
        'current_price': stock_data['price'],
        'market_cap': stock_data['market_cap'],
        'pe_ratio': stock_data['pe_ratio'],
        'dividend_yield': stock_data['dividend_yield'],
        'volume': volume,
        'week_52_high': stock_details['week_52_high'],
        'week_52_low': stock_details['week_52_low'],
        'average_volume': stock_details['average_volume']
    }
    return jsonify(stock_response), 200

# Get All Stocks
@stock_routes.route('/', methods=['GET'])
@login_required
def get_all_stocks():
    stocks = []
    for symbol in looked_up_symbols:
        stock_data = get_stock_price(symbol)
        stock_details = get_stock_details(symbol)
        volume = get_stock_volume(symbol)
        if stock_data and stock_details:
            stock_response = {
                'symbol': stock_data['symbol'],
                'name': stock_data['name'],
                'current_price': stock_data['price'],
                'market_cap': stock_data['market_cap'],
                'pe_ratio': stock_data['pe_ratio'],
                'dividend_yield': stock_data['dividend_yield'],
                'volume': volume,
                'week_52_high': stock_details['week_52_high'],
                'week_52_low': stock_details['week_52_low'],
                'average_volume': stock_details['average_volume']
            }
            stocks.append(stock_response)
    return jsonify(stocks), 200
