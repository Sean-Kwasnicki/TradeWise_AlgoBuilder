from flask import Blueprint, request, jsonify
from app.models import db, AlgorithmBlock
from app.forms import AlgorithmBlockForm
from flask_login import login_required, current_user

algorithm_block_routes = Blueprint('algorithm_blocks', __name__)

@algorithm_block_routes.route('/', methods=['POST'])
@login_required
def create_algorithm_block():
    form = AlgorithmBlockForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_block = AlgorithmBlock(
            algorithm_id=form.data['algorithm_id'],
            technical_indicator_type=form.data['technical_indicator_type'],
            parameters=form.data['parameters'],
            block_order=form.data['block_order']
        )
        db.session.add(new_block)
        db.session.commit()
        return new_block.to_dict(), 201
    return {'errors': form.errors}, 400

@algorithm_block_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_algorithm_block(id):
    block = AlgorithmBlock.query.get_or_404(id)

    form = AlgorithmBlockForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        block.technical_indicator_type = form.data['technical_indicator_type']
        block.parameters = form.data['parameters']
        block.block_order = form.data['block_order']

        db.session.commit()
        return block.to_dict(), 200
    return {'errors': form.errors}, 400

@algorithm_block_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_algorithm_block(id):
    block = AlgorithmBlock.query.get_or_404(id)

    db.session.delete(block)
    db.session.commit()
    return {'message': 'Block deleted successfully'}, 200
