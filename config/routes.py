from app import app
from controllers import pools, auth

# loading it in to memory (RAM)
app.register_blueprint(pools.router)
app.register_blueprint(auth.router)
