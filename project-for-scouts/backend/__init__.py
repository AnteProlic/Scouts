from flask import Flask
from backend.config import dev_config
from .db import mongo
from .routes.auth import user
from .routes.location import location
from .routes.legend import legend
from .routes.fileman import fileman

app = Flask(__name__)
dev_config(app)

app.register_blueprint(user)
app.register_blueprint(location)
app.register_blueprint(legend)
app.register_blueprint(fileman)

mongo.init_app(app)