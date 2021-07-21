from flask import Flask
from backend.config import dev_config
from .db import mongo
from .routes.auth import user
from .routes.location import location
from .routes.legend import legend
from .routes.fileman import fileman
from .routes.req import req
from flask_cors import CORS

app = Flask(__name__)
dev_config(app)
CORS(app, supports_credentials=True)

app.register_blueprint(user)
app.register_blueprint(location)
app.register_blueprint(legend)
app.register_blueprint(fileman)
app.register_blueprint(req)

mongo.init_app(app)