from flask import Blueprint, request, jsonify

algorithm_library_routes = Blueprint('algorithm_library', __name__)

# Mock database for libraries
libraries = []

@algorithm_library_routes.route('/libraries', methods=['GET'])
def get_libraries():
    return jsonify(libraries)

@algorithm_library_routes.route('/libraries', methods=['POST'])
def add_library():
    new_library = request.json
    libraries.append(new_library)
    return jsonify(new_library), 201

@algorithm_library_routes.route('/libraries/<int:id>', methods=['PUT'])
def edit_library(id):
    updated_library = request.json
    for library in libraries:
        if library['id'] == id:
            library.update(updated_library)
            return jsonify(library)
    return jsonify({'error': 'Library not found'}), 404

@algorithm_library_routes.route('/libraries/<int:id>', methods=['DELETE'])
def delete_library(id):
    global libraries
    libraries = [library for library in libraries if library['id'] != id]
    return jsonify({'message': 'Library deleted'})

@algorithm_library_routes.route('/libraries/<int:library_id>/algorithms', methods=['GET'])
def get_algorithms(library_id):
    for library in libraries:
        if library['id'] == library_id:
            return jsonify(library.get('algorithms', []))
    return jsonify({'error': 'Library not found'}), 404

@algorithm_library_routes.route('/libraries/<int:library_id>/algorithms', methods=['POST'])
def add_algorithm(library_id):
    new_algorithm = request.json
    for library in libraries:
        if library['id'] == library_id:
            if 'algorithms' not in library:
                library['algorithms'] = []
            library['algorithms'].append(new_algorithm)
            return jsonify(new_algorithm), 201
    return jsonify({'error': 'Library not found'}), 404

@algorithm_library_routes.route('/libraries/<int:library_id>/algorithms/<int:algorithm_id>', methods=['PUT'])
def edit_algorithm(library_id, algorithm_id):
    updated_algorithm = request.json
    for library in libraries:
        if library['id'] == library_id:
            for algorithm in library.get('algorithms', []):
                if algorithm['id'] == algorithm_id:
                    algorithm.update(updated_algorithm)
                    return jsonify(algorithm)
    return jsonify({'error': 'Algorithm not found'}), 404

@algorithm_library_routes.route('/libraries/<int:library_id>/algorithms/<int:algorithm_id>', methods=['DELETE'])
def delete_algorithm(library_id, algorithm_id):
    for library in libraries:
        if library['id'] == library_id:
            library['algorithms'] = [algorithm for algorithm in library.get('algorithms', []) if algorithm['id'] != algorithm_id]
            return jsonify({'message': 'Algorithm deleted'})
    return jsonify({'error': 'Library not found'}), 404
