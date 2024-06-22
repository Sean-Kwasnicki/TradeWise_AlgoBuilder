from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Backtest, Algorithm, db
from app.forms import BacktestForm

backtest_routes = Blueprint('backtests', __name__)

@backtest_routes.route('', methods=['POST'])
@login_required
def create_backtest():
    form = BacktestForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_backtest = Backtest(
            algorithm_id=form.data['algorithm_id'],
            start_date=form.data['start_date'],
            end_date=form.data['end_date'],
            initial_balance=form.data['initial_balance'],
            final_balance=form.data['final_balance'],
            profit_loss=form.data['profit_loss'],
            drawdown=form.data['drawdown'],
            roi=form.data['roi']
        )
        db.session.add(new_backtest)
        db.session.commit()

        return jsonify(new_backtest.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

@backtest_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_backtest(id):
    backtest = Backtest.query.get(id)
    if not backtest:
        return jsonify({'errors': 'Backtest not found'}), 404
    algorithm = Algorithm.query.get(backtest.algorithm_id)
    if algorithm.user_id != current_user.id:
        return jsonify({'errors': 'Unauthorized access'}), 401

    return jsonify(backtest.to_dict()), 200

@backtest_routes.route('', methods=['GET'])
@login_required
def get_all_backtests():
    algorithms = Algorithm.query.filter_by(user_id=current_user.id).all()
    algorithm_ids = [algorithm.id for algorithm in algorithms]
    backtests = Backtest.query.filter(Backtest.algorithm_id.in_(algorithm_ids)).all()
    return jsonify([bt.to_dict() for bt in backtests]), 200

@backtest_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_backtest(id):
    backtest = Backtest.query.get(id)
    if not backtest:
        return jsonify({'errors': 'Backtest not found'}), 404
    algorithm = Algorithm.query.get(backtest.algorithm_id)
    if algorithm.user_id != current_user.id:
        return jsonify({'errors': 'Unauthorized access'}), 401

    form = BacktestForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        backtest.start_date = form.data['start_date']
        backtest.end_date = form.data['end_date']
        backtest.initial_balance = form.data['initial_balance']
        backtest.final_balance = form.data['final_balance']
        backtest.profit_loss = form.data['profit_loss']
        backtest.drawdown = form.data['drawdown']
        backtest.roi = form.data['roi']
        db.session.commit()

        return jsonify(backtest.to_dict()), 200
    return jsonify({'errors': form.errors}), 400

@backtest_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_backtest(id):
    backtest = Backtest.query.get(id)
    if not backtest:
        return jsonify({'errors': 'Backtest not found'}), 404
    algorithm = Algorithm.query.get(backtest.algorithm_id)
    if algorithm.user_id != current_user.id:
        return jsonify({'errors': 'Unauthorized access'}), 401

    db.session.delete(backtest)
    db.session.commit()

    return jsonify({'message': 'Backtest deleted successfully'}), 200
