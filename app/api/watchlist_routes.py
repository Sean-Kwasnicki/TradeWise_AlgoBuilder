from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Watchlist, WatchlistStock, Stock, db
from app.forms.watchlist_form import WatchlistForm
from app.forms.watchlist_stock_form import WatchlistStockForm
from app.api.finnhub_client import get_stock_price

watchlist_routes = Blueprint('watchlists', __name__)

# Create Watchlist
@watchlist_routes.route('', methods=['POST'])
@login_required
def create_watchlist():
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        watchlist = Watchlist(
            user_id=current_user.id,
            name=form.name.data
        )
        db.session.add(watchlist)
        db.session.commit()
        return jsonify(watchlist.to_dict()), 201
    return jsonify({"errors": form.errors}), 400

# Get Watchlist
@watchlist_routes.route('/<int:id>', methods=['GET'])
# @login_required
def get_watchlist(id):
    watchlist = Watchlist.query.get(id)
    if not watchlist or watchlist.user_id != current_user.id:
        return jsonify({"errors": "Watchlist not found"}), 404
    return jsonify(watchlist.to_dict()), 200

# Get All Watchlists
@watchlist_routes.route('', methods=['GET'])
@login_required
def get_all_watchlists():
    watchlists = Watchlist.query.filter_by(user_id=current_user.id).all()
    return jsonify([watchlist.to_dict() for watchlist in watchlists]), 200

# Update Watchlist
@watchlist_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_watchlist(id):
    watchlist = Watchlist.query.get(id)
    if not watchlist or watchlist.user_id != current_user.id:
        return jsonify({"errors": "Watchlist not found"}), 404

    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        watchlist.name = form.name.data
        db.session.commit()
        return jsonify(watchlist.to_dict()), 200
    return jsonify({"errors": form.errors}), 400

# Delete Watchlist
@watchlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_watchlist(id):
    watchlist = Watchlist.query.get(id)
    if not watchlist or watchlist.user_id != current_user.id:
        return jsonify({"errors": "Watchlist not found"}), 404
    db.session.delete(watchlist)
    db.session.commit()
    return jsonify({"message": "Watchlist deleted successfully"}), 200

# Add Stock to Watchlist
@watchlist_routes.route('/<int:watchlist_id>/stocks', methods=['POST'])
@login_required
def add_stock_to_watchlist(watchlist_id):
    watchlist = Watchlist.query.get(watchlist_id)
    if not watchlist or watchlist.user_id != current_user.id:
        return jsonify({"errors": "Watchlist not found"}), 404

    form = WatchlistStockForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        stock_symbol = form.stock_symbol.data
        stock_price_info = get_stock_price(stock_symbol)
        if not stock_price_info:
            return jsonify({"errors": "Stock not found"}), 404

        watchlist_stock = WatchlistStock(
        watchlist_id=watchlist_id,
        stock_symbol=stock_symbol,
        current_price=stock_price_info['price']
        )
        db.session.add(watchlist_stock)
        db.session.commit()
        return jsonify(watchlist_stock.to_dict()), 201
    return jsonify({"errors": form.errors}), 400

# Get Watchlist Stocks
@watchlist_routes.route('/<int:watchlist_id>/stocks', methods=['GET'])
@login_required
def get_watchlist_stocks(watchlist_id):
    watchlist = Watchlist.query.get(watchlist_id)
    if not watchlist or watchlist.user_id != current_user.id:
        return jsonify({"errors": "Watchlist not found"}), 404

    stocks = WatchlistStock.query.filter_by(watchlist_id=watchlist_id).all()

    # Fetch current prices for each stock
    updated_stocks = []
    for stock in stocks:
        stock_data = get_stock_price(stock.stock_symbol)
        if stock_data:
            stock.current_price = stock_data['price']
            updated_stocks.append(stock)

    db.session.commit()
    return jsonify([stock.to_dict() for stock in updated_stocks]), 200


# Delete Stock from Watchlist
@watchlist_routes.route('/<int:watchlist_id>/stocks/<int:id>', methods=['DELETE'])
@login_required
def delete_stock_from_watchlist(watchlist_id, id):
    watchlist_stock = WatchlistStock.query.filter_by(watchlist_id=watchlist_id, id=id).first()
    if not watchlist_stock or watchlist_stock.watchlist.user_id != current_user.id:
        return jsonify({"errors": "Watchlist or stock not found"}), 404
    db.session.delete(watchlist_stock)
    db.session.commit()
    return jsonify({"message": "Stock deleted from watchlist successfully"}), 200
