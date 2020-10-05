from flask import Flask, Blueprint
from backend.config import dev_config

mod = Blueprint('/register', __name__)

APP = Flask(__name__)

@mod.route('/register')
def register():
    return 'This is register.'

if __name__ == '__main__':
    APP.run(host='0.0.0.0')