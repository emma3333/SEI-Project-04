from flask import Blueprint, request, jsonify, g
from models.User import User, UserSchema
from app import db
from pony.orm import db_session
from marshmallow import ValidationError
from lib.secure_route import secure_route

router = Blueprint('auth', __name__)

@router.route('/register', methods=['POST'])
@db_session
def register():

    schema = UserSchema()

    try:
        data = schema.load(request.get_json())
        user = User(**data)
        db.commit()
    except ValidationError as error:
        return jsonify({'error': error.messages}), 422


    return jsonify({
        'message': 'Registation successful',
        'token': user.generate_token()
    })


@router.route('/login', methods=['POST'])
@db_session
def login():

    data = request.get_json()

    user = User.get(email=data.get('email'))

    if not user or not user.is_password_valid(data.get('password')):
        return jsonify({'message': 'Unauthorized'}), 401

    return jsonify({
        'message': f'Welcome back {user.username}',
        'token': user.generate_token()
    })


# Profile ===================================================================

@router.route('/profile', methods=['GET'])
@db_session # Allow access to the database for the 'index' function
@secure_route
def user_index():
    # This will serialize our data
    schema = UserSchema() #many=True
    user = User.get(id=g.current_user.id)
    return schema.dumps(user) # 'schema.dumps' converts the list to JSON



# @router.route('/profile', methods=['GET'])
# @db_session # Allow access to the database for the 'index' function
# def index():
#     # This will serialize our data
#     schema = UserSchema(many=True)
#     users = User.select()
#     return schema.dumps(users) # 'schema.dumps' converts the list to JSON
#
# @router.route('/users/<int:user_id>', methods=['GET'])
# @db_session
# def show(user_id):
#     # This will serialize our data
#     schema = UserSchema()
#     # This gets a pool by ID
#     user = User.get(id=user_id)
#
#     # If we can't find a pool, send a 404 response
#     if not user:
#         abort(404)
#
#     # otherwise, send back the pool data as JSON
#     return schema.dumps(user)
