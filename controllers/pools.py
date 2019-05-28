from flask import Blueprint, request, jsonify, abort #flask is responsible for sending responses
from pony.orm import db_session
from marshmallow import ValidationError
from app import db
from models.Pool import Pool, PoolSchema

router = Blueprint(__name__, 'pools') # creates the router for this controller

@router.route('/pools', methods=['GET'])
@db_session # Allow access to the database for the 'index' function
def index():
    # This will serialize our data
    schema = PoolSchema(many=True)
    pools = Pool.select()
    return schema.dumps(pools) # 'schema.dumps' converts the list to JSON

@router.route('/pools', methods=['POST'])
@db_session
def create():
    # This will deserialize the JSON from insomnia
    schema = PoolSchema()

    try:
        # attempt to convert the JSON into a dict
        data = schema.load(request.get_json())
        # Use that to create a pool object
        pool = Pool(**data)
        # Store it in the database
        db.commit()
    except ValidationError as err:
        # if the validation fails, send back a 422 response
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    # otherwise, send back the pool data as JSON
    return schema.dumps(pool), 201


@router.route('/pools/<int:pool_id>', methods=['GET'])
@db_session
def show(pool_id):
    # This will serialize our data
    schema = PoolSchema()
    # This gets a pool by ID
    pool = Pool.get(id=pool_id)

    # If we can't find a pool, send a 404 response
    if not pool:
        abort(404)

    # otherwise, send back the pool data as JSON
    return schema.dumps(pool)

@router.route('/pools/<int:pool_id>', methods=['PUT'])
@db_session
def update(pool_id):
    # This serializes our data, turns the object into a string
    schema = PoolSchema()
    # This gets the pool by its ID
    pool = Pool.get(id=pool_id)

    if not pool:
        abort(404)

    try:
        # attempt to turn the JSON string into a dict / object (de-serialization)
        data = schema.load(request.get_json())
        pool.set(**data)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(pool)

@router.route('/pools/<int:pool_id>', methods=['DELETE'])
@db_session
def delete(pool_id):
    pool = Pool.get(id=pool_id)

    if not pool:
        abort(404)

    pool.delete()
    db.commit()

    return '', 204
