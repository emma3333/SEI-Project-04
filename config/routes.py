import os
from flask import abort
from app import app
from controllers import pools, auth

# loading it in to memory (RAM)
app.register_blueprint(pools.router, url_prefix='/api')
app.register_blueprint(auth.router, url_prefix='/api')

# the frontend lives inside the public folder, so writing the below so our back end app can run with the front end
@app.route('/') # if you're on the homepage, then run the function beneath (catch all)
@app.route('/<path:path>') # otherwise, anything else (in express we'd write '/*')
def catch_all(path='index.html'): # setting a default argument of index.html for when there is no path
    if os.path.isfile('public/' + path): # if the path is a file, send the file, if not send a 404 error message
        return app.send_static_file(path)

    return abort(404)
