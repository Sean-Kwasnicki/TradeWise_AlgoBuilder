from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Portfolio, Stock, PortfolioStock, db
from app.forms import AddPortfolioStockForm, UpdatePortfolioStockForm, CreatePortfolioForm, UpdatePortfolioForm
from app.api.finnhub_client import get_stock_price
from app.api.yahoo_finance_client import get_stock_details
from decimal import Decimal


portfolio_routes = Blueprint('portfolios', __name__)

def update_portfolio_values(portfolio):
    portfolio.update_values()
    db.session.commit()


# Create Portfolio
@portfolio_routes.route('/', methods=['POST'])
@login_required
def create_portfolio():
    form = CreatePortfolioForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = request.get_json()
        portfolio = Portfolio(
            user_id=current_user.id,
            name=data['name'],
            initial_balance=data['initial_balance'],
            current_value=data['initial_balance'],
            free_capital=data['initial_balance'],
            profit_loss=0.00
        )
        db.session.add(portfolio)
        db.session.commit()
        return jsonify(portfolio.to_dict()), 201
    return jsonify({"errors": form.errors}), 400


# Get Portfolio
@portfolio_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_portfolio(id):
    portfolio = Portfolio.query.get(id)
    if portfolio is None:
        return jsonify({"errors": "Portfolio not found"}), 404
    if portfolio.user_id != current_user.id:
        return jsonify({"errors": "Unauthorized access"}), 401
    return jsonify(portfolio.to_dict()), 200

# Get All Portfolios
@portfolio_routes.route('/', methods=['GET'])
@login_required
def get_all_portfolios():
    portfolios = Portfolio.query.filter_by(user_id=current_user.id).all()
    return jsonify([portfolio.to_dict() for portfolio in portfolios]), 200

# Update Portfolio
@portfolio_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_portfolio(id):
    data = request.get_json()
    portfolio = Portfolio.query.get(id)
    if portfolio is None:
        return jsonify({"errors": "Portfolio not found"}), 404
    if portfolio.user_id != current_user.id:
        return jsonify({"errors": "Unauthorized access"}), 401

    if 'name' in data:
        portfolio.name = data['name']

    db.session.commit()
    return jsonify(portfolio.to_dict()), 200


# Delete Portfolio
@portfolio_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_portfolio(id):
    portfolio = Portfolio.query.get(id)
    if portfolio is None:
        return jsonify({"errors": "Portfolio not found"}), 404
    if portfolio.user_id != current_user.id:
        return jsonify({"errors": "Unauthorized access"}), 401

    db.session.delete(portfolio)
    db.session.commit()
    return jsonify({"message": "Portfolio deleted successfully"}), 200

# Add Stock to Portfolio
@portfolio_routes.route('/<int:portfolio_id>/stocks', methods=['POST'])
@login_required
def add_stock_to_portfolio(portfolio_id):
    data = request.get_json()
    portfolio = Portfolio.query.get(portfolio_id)
    if not portfolio or portfolio.user_id != current_user.id:
        return jsonify({"errors": "Portfolio not found or unauthorized"}), 404

    stock_symbol = data.get('stock_symbol')
    stock_quantity = data.get('quantity')
    stock_purchase_price = Decimal(data.get('purchase_price'))

    if not stock_symbol or not stock_quantity or not stock_purchase_price:
        return jsonify({"errors": "Invalid data"}), 400

    stock_price_info = get_stock_price(stock_symbol)
    if not stock_price_info:
        return jsonify({"errors": "Stock not found"}), 404

    stock_current_price = Decimal(stock_price_info['price'])
    total_purchase_value = stock_purchase_price * Decimal(stock_quantity)

    if total_purchase_value > portfolio.free_capital:
        return jsonify({"errors": "Not enough free capital"}), 400

    portfolio_stock = PortfolioStock(
        portfolio_id=portfolio_id,
        stock_symbol=stock_symbol,
        quantity=stock_quantity,
        purchase_price=stock_purchase_price,
        current_price=stock_current_price
    )
    db.session.add(portfolio_stock)

    portfolio.current_value += total_purchase_value
    portfolio.profit_loss = portfolio.current_value - portfolio.initial_balance
    portfolio.free_capital -= total_purchase_value

    db.session.commit()
    return jsonify({
        "portfolio_stock": portfolio_stock.to_dict(),
    }), 201


# Get Portfolio Stocks
@portfolio_routes.route('/<int:portfolio_id>/stocks', methods=['GET'])
@login_required
def get_portfolio_stocks(portfolio_id):
    portfolio = Portfolio.query.get(portfolio_id)
    if portfolio is None:
        return jsonify({"errors": "Portfolio not found"}), 404
    if portfolio.user_id != current_user.id:
        return jsonify({"errors": "Unauthorized access"}), 401

    stocks = PortfolioStock.query.filter_by(portfolio_id=portfolio_id).all()

    # Fetch current prices for each stock
    updated_stocks = []
    for stock in stocks:
        stock_data = get_stock_price(stock.stock_symbol)
        if stock_data:
            stock.current_price = stock_data['price']
            updated_stocks.append(stock)

    db.session.commit()
    return jsonify([stock.to_dict() for stock in updated_stocks]), 200

# Update Portfolio Stock
@portfolio_routes.route('/<int:portfolio_id>/stocks/<int:id>', methods=['PUT'])
@login_required
def update_portfolio_stock(portfolio_id, id):
    form = UpdatePortfolioStockForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = request.get_json()
        portfolio = Portfolio.query.get(portfolio_id)
        if portfolio is None:
            return jsonify({"errors": "Portfolio not found"}), 404
        if portfolio.user_id != current_user.id:
            return jsonify({"errors": "Unauthorized access"}), 401

        stock = PortfolioStock.query.get(id)
        if stock is None or stock.portfolio_id != portfolio_id:
            return jsonify({"errors": "Stock not found"}), 404

        stock.quantity = data.get('quantity', stock.quantity)
        stock.purchase_price = data.get('purchase_price', stock.purchase_price)
        stock.current_price = data.get('current_price', stock.current_price)
        db.session.commit()
        return jsonify(stock.to_dict()), 200
    return jsonify({"errors": form.errors}), 400


# Delete Portfolio Stock
@portfolio_routes.route('/<int:portfolio_id>/stocks/<int:id>', methods=['DELETE'])
@login_required
def delete_portfolio_stock(portfolio_id, id):
    portfolio = Portfolio.query.get(portfolio_id)
    if portfolio is None:
        return jsonify({"errors": "Portfolio not found"}), 404
    if portfolio.user_id != current_user.id:
        return jsonify({"errors": "Unauthorized access"}), 401

    stock = PortfolioStock.query.get(id)
    if stock is None or stock.portfolio_id != portfolio_id:
        return jsonify({"errors": "Portfolio or stock not found"}), 404

    db.session.delete(stock)
    db.session.commit()
    return jsonify({"message": "Stock deleted from portfolio successfully"}), 200
