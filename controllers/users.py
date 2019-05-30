from flask import Blueprint, request, jsonify, abort, g
from pony.orm import db_session
from models.User import User, UserSchema


router = Blueprint(__name__, 'users') # creates the router for this controller

@router.route('/users', methods=['GET'])
@db_session # Allow access to the database for the 'index' function
def index():
    # This will serialize our data
    schema = UserSchema(many=True)
    users = User.select()
    return schema.dumps(users) # 'schema.dumps' converts the list to JSON

@router.route('/users/<int:user_id>', methods=['GET'])
@db_session
def show(user_id):
    # This will serialize our data
    schema = UserSchema()
    # This gets a pool by ID
    user = User.get(id=user_id)

    # If we can't find a pool, send a 404 response
    if not user:
        abort(404)

    # otherwise, send back the pool data as JSON
    return schema.dumps(user)
