from app import app
from controllers import pools, auth

# loading it in to memory (RAM)
app.register_blueprint(pools.router, url_prefix='/api')
app.register_blueprint(auth.router, url_prefix='/api')
# app.register_blueprint(users.router, url_prefix='/api')
