from flask import Flask, jsonify
from pony.orm import Database
from config.environment import db_uri


app = Flask(__name__, static_folder='public') # telling flask which folder the static files are (says where the frontend files are)
db = Database()

# pylint: disable=W0611,C0413
db.bind('postgres', db_uri)

from config import routes

db.generate_mapping(create_tables=True)

@app.errorhandler(404)
def not_found(_error):
    return jsonify({'message': 'Not found'}), 404
