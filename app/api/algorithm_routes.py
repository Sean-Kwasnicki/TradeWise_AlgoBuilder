from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Algorithm, db
from app.forms import AlgorithmForm

algorithm_routes = Blueprint('algorithms', __name__)

@algorithm_routes.route('', methods=['POST'])
@login_required
def create_algorithm():
    form = AlgorithmForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_algorithm = Algorithm(
            user_id=current_user.id,
            name=form.data['name'],
            description=form.data['description']
        )
        db.session.add(new_algorithm)
        db.session.commit()

        return jsonify(new_algorithm.to_dict()), 201
    return jsonify({'errors': form.errors}), 400

@algorithm_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_algorithm(id):
    algorithm = Algorithm.query.get(id)
    if not algorithm:
        return jsonify({'errors': 'Algorithm not found'}), 404
    if algorithm.user_id != current_user.id:
        return jsonify({'errors': 'Unauthorized access'}), 401

    return jsonify(algorithm.to_dict()), 200

@algorithm_routes.route('', methods=['GET'])
@login_required
def get_all_algorithms():
    algorithms = Algorithm.query.filter_by(user_id=current_user.id).all()
    return jsonify([algo.to_dict() for algo in algorithms]), 200

@algorithm_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_algorithm(id):
    algorithm = Algorithm.query.get(id)
    if not algorithm:
        return jsonify({'errors': 'Algorithm not found'}), 404
    if algorithm.user_id != current_user.id:
        return jsonify({'errors': 'Unauthorized access'}), 401

    form = AlgorithmForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        algorithm.name = form.data['name']
        algorithm.description = form.data['description']
        db.session.commit()

        return jsonify(algorithm.to_dict()), 200
    return jsonify({'errors': form.errors}), 400

@algorithm_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_algorithm(id):
    algorithm = Algorithm.query.get(id)
    if not algorithm:
        return jsonify({'errors': 'Algorithm not found'}), 404
    if algorithm.user_id != current_user.id:
        return jsonify({'errors': 'Unauthorized access'}), 401

    db.session.delete(algorithm)
    db.session.commit()

    return jsonify({'message': 'Algorithm deleted successfully'}), 200
