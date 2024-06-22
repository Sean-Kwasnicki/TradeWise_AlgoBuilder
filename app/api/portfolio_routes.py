from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Portfolio, Stock, PortfolioStock, db
from app.forms import AddPortfolioStockForm, UpdatePortfolioStockForm, CreatePortfolioForm, UpdatePortfolioForm

portfolio_routes = Blueprint('portfolios', __name__)

# Create Portfolio
@portfolio_routes.route('/', methods=['POST'])
@login_required
def create_portfolio():
    form = CreatePortfolioForm()
    if form.validate_on_submit():
        data = request.get_json()
        portfolio = Portfolio(
            user_id=current_user.id,
            name=data['name'],
            initial_balance=data['initial_balance'],
            current_value=data['initial_balance'],
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
    form = UpdatePortfolioForm()
    if form.validate_on_submit():
        data = request.get_json()
        portfolio = Portfolio.query.get(id)
        if portfolio is None:
            return jsonify({"errors": "Portfolio not found"}), 404
        if portfolio.user_id != current_user.id:
            return jsonify({"errors": "Unauthorized access"}), 401

        portfolio.name = data['name']
        portfolio.initial_balance = data['initial_balance']
        portfolio.current_value = data['current_value']
        portfolio.profit_loss = data['profit_loss']
        db.session.commit()
        return jsonify(portfolio.to_dict()), 200
    return jsonify({"errors": form.errors}), 400

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
    form = AddPortfolioStockForm()
    if form.validate_on_submit():
        data = request.get_json()
        portfolio = Portfolio.query.get(portfolio_id)
        if portfolio is None:
            return jsonify({"errors": "Portfolio not found"}), 404
        if portfolio.user_id != current_user.id:
            return jsonify({"errors": "Unauthorized access"}), 401

        stock = PortfolioStock(
            portfolio_id=portfolio_id,
            stock_id=data['stock_id'],
            quantity=data['quantity'],
            purchase_price=data['purchase_price'],
            current_price=data['purchase_price']  # Assume the current price is the same as purchase price initially
        )
        db.session.add(stock)
        db.session.commit()
        return jsonify(stock.to_dict()), 201
    return jsonify({"errors": form.errors}), 400

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
    return jsonify([stock.to_dict() for stock in stocks]), 200

# Update Portfolio Stock
@portfolio_routes.route('/<int:portfolio_id>/stocks/<int:id>', methods=['PUT'])
@login_required
def update_portfolio_stock(portfolio_id, id):
    form = UpdatePortfolioStockForm()
    if form.validate_on_submit():
        data = request.get_json()
        portfolio = Portfolio.query.get(portfolio_id)
        if portfolio is None:
            return jsonify({"errors": "Portfolio not found"}), 404
        if portfolio.user_id != current_user.id:
            return jsonify({"errors": "Unauthorized access"}), 401

        stock = PortfolioStock.query.get(id)
        if stock is None or stock.portfolio_id != portfolio_id:
            return jsonify({"errors": "Portfolio or stock not found"}), 404

        stock.quantity = data['quantity']
        stock.purchase_price = data['purchase_price']
        stock.current_price = data['current_price']
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
