from flask import Blueprint, request, jsonify, abort, g
from pony.orm import db_session
from marshmallow import ValidationError
from app import db
from models.Pool import Pool, PoolSchema, Comment, CommentSchema
from lib.secure_route import secure_route

router = Blueprint(__name__, 'pools') # creates the router for this controller

@router.route('/pools', methods=['GET'])
@db_session # Allow access to the database for the 'index' function
def index():
    schema = PoolSchema(many=True)

    if request.args:
        region = request.args.get('region')
        pool_type = request.args.get('type')

        pools = Pool.select(lambda pool: pool.region == region or pool.type == pool_type)

    else:
        pools = Pool.select()

    return schema.dumps(pools) # 'schema.dumps' converts the list to JSON

@router.route('/pools', methods=['POST'])
@db_session
@secure_route
def create():
    # This will deserialize the JSON from insomnia
    schema = PoolSchema()

    try:
        # attempt to convert the JSON into a dict
        data = schema.load(request.get_json())
        # Use that to create a pool object
        data['user'] = g.current_user
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
@secure_route
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
@secure_route
def delete(pool_id):
    pool = Pool.get(id=pool_id)

    if not pool:
        abort(404)

    pool.delete()
    db.commit()

    return '', 204

# COMMENTS ============================================================

@router.route('/pools/<int:pool_id>/comments', methods=['POST'])
@db_session
@secure_route
def create_comment(pool_id):
    pool_schema = PoolSchema()
    comment_schema = CommentSchema()
    pool = Pool.get(id=pool_id)

    try:
        # attempt to convert the JSON into a dict
        data = comment_schema.load(request.get_json())
    except ValidationError as err:
            # if the validation fails, send back a 422 response
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422
        # Use that to create a pool object
    Comment(**data, pool=pool, user=g.current_user)
        # Store it in the database
    db.commit()

    # otherwise, send back the pool data as JSON
    return pool_schema.dumps(pool), 201


@router.route('/pools/<int:pool_id>/comments/<int:comment_id>', methods=['GET'])
@db_session
def show_comment(pool_id, comment_id):
    schema = PoolSchema()
    pool = Pool.get(id=pool_id)
    comment = Comment.get(id=comment_id)

    # If we can't find a pool, send a 404 response
    if not comment:
        abort(404)

    # otherwise, send back the pool data as JSON
    return schema.dumps(comment)


@router.route('/pools/<int:pool_id>/comments/<int:comment_id>', methods=['DELETE'])
@db_session
@secure_route
def delete_comment(pool_id, comment_id):
    schema = PoolSchema()
    pool = Pool.get(id=pool_id)
    comment = Comment.get(id=comment_id)
    comment.delete()
    db.commit()

    return schema.dumps(pool)


# STARRED POOLS ===============================================================

@router.route('/pools/<int:pool_id>/star', methods=['POST'])
@db_session
@secure_route
def star_pool(pool_id):
    schema = PoolSchema()
    pool = Pool.get(id=pool_id)
    pool.starred_by.add(g.current_user)
    db.commit()

    return schema.dumps(pool)
